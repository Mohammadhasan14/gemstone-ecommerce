import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// Real Razorpay integration point. No RAZORPAY_KEY_ID/KEY_SECRET are configured yet
// (no Razorpay account has been created for this project), so createRazorpayOrder()
// returns a clearly-labeled stub instead of calling out, and the checkout UI shows a
// "simulate payment" control in its place. Once real keys exist, set the env vars
// below and swap the stub branch for the real fetch call — everything downstream
// (order creation, markOrderPaid, webhook route shape) is already real.

export function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export async function createRazorpayOrder(amountMinor: number, receipt: string, ourOrderId: string) {
  if (!isRazorpayConfigured()) {
    return { stub: true as const, id: `stub_${receipt}`, amount: amountMinor, currency: "INR" };
  }

  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    // `notes.ourOrderId` is echoed back on every webhook event for this order —
    // that's how the webhook route below maps Razorpay's order back to ours.
    body: JSON.stringify({ amount: amountMinor, currency: "INR", receipt, notes: { ourOrderId } }),
  });

  if (!res.ok) throw new Error(`Razorpay order creation failed: ${res.status}`);
  const data = await res.json();
  return { stub: false as const, id: data.id as string, amount: amountMinor, currency: "INR" };
}

// Per Razorpay's documented webhook scheme: HMAC-SHA256 of the raw request body,
// keyed with the webhook secret, compared to the X-Razorpay-Signature header.
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (expectedBuf.length !== signatureBuf.length) return false;

  return timingSafeEqual(expectedBuf, signatureBuf);
}
