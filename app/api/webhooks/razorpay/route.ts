import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";
import { markOrderPaid } from "@/lib/db/queries/orders";
import { clearCart, getCartForUser } from "@/lib/db/queries/cart";
import { sendOrderConfirmationEmail } from "@/lib/email/send-order-confirmation";

// NOTE: unreachable/untested in this environment — no Razorpay account exists to
// deliver a real webhook call yet. Implemented per Razorpay's documented
// `payment.captured` event shape (razorpay.com/docs/webhooks) so it's ready to
// point a real webhook endpoint at once RAZORPAY_WEBHOOK_SECRET is set.
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "payment.captured") {
    return NextResponse.json({ received: true });
  }

  const payment = event.payload?.payment?.entity;
  const ourOrderId: string | undefined = payment?.notes?.ourOrderId;
  if (!ourOrderId) {
    return NextResponse.json({ error: "Missing order reference" }, { status: 400 });
  }

  const order = await markOrderPaid(ourOrderId, payment.id, rawBody);
  if (!order) {
    return NextResponse.json({ received: true });
  }

  // Guest carts are cookie-keyed, and a server-to-server webhook has no cookie
  // access — for guest checkout, cart-clearing happens via the client-invoked
  // simulatePayment()/redirect path instead. This only covers logged-in carts.
  const cart = order.userId ? await getCartForUser(order.userId) : null;
  if (cart) await clearCart(cart.id);

  await sendOrderConfirmationEmail({
    to: order.email,
    orderNumber: order.orderNumber,
    totalMinor: order.totalMinor,
    currency: order.currency,
  });

  return NextResponse.json({ received: true });
}
