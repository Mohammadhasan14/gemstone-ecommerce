"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulatePayment } from "@/actions/checkout";

export function PaymentPanel({ orderId, isRazorpayConfigured }: { orderId: string; isRazorpayConfigured: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (isRazorpayConfigured) {
    // Real keys exist — this is the integration point for the actual Razorpay
    // Checkout embed (razorpay.com/docs/payments/payment-gateway/web-integration/standard).
    return <p className="text-sm text-muted">Loading payment gateway…</p>;
  }

  return (
    <div className="rounded-2xl border border-gold/25 bg-gold/8 px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex items-start gap-2.5">
        <ShieldAlert size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-gold" />
        <div className="text-[13px] leading-snug text-ink">
          <span className="font-semibold">Razorpay isn&apos;t connected yet.</span> This button simulates a
          successful payment webhook so you can see the rest of the flow — swap in real API keys and this panel
          becomes the actual Razorpay checkout.
        </div>
      </div>

      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            const result = await simulatePayment(orderId);
            if (!result.ok) {
              setError("This order can no longer be paid (it may already be paid or cancelled).");
              return;
            }
            router.push(`/checkout/confirmation/${orderId}`);
          })
        }
        className="mt-4 w-full"
      >
        {isPending ? "Processing…" : "Simulate Successful Payment"}
      </Button>

      {error && <p className="mt-3 text-[13px] text-[#B4304A]">{error}</p>}
    </div>
  );
}
