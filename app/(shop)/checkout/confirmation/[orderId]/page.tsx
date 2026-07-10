import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getOrderById } from "@/lib/db/queries/orders";
import { OrderSummarySidebar } from "@/components/checkout/order-summary-sidebar";

export const metadata: Metadata = { title: "Order Confirmed — HK Gems" };

export default async function ConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  if (order.status === "pending") {
    redirect(`/checkout/payment/${order.id}`);
  }

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={28} strokeWidth={1.8} className="text-teal" />
          <div>
            <h1 className="font-serif text-3xl font-normal text-ink sm:text-4xl">Order Confirmed</h1>
            <p className="mt-1 text-sm text-muted">
              Order <span className="font-semibold text-ink">{order.orderNumber}</span> — a confirmation has been
              sent to {order.email}.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-ink/7 bg-white px-5 py-5 sm:px-6 sm:py-6">
            <h2 className="font-serif text-lg text-ink">Shipping To</h2>
            <div className="mt-3 text-[13.5px] leading-[1.6] text-muted">
              {order.shippingFullName} · {order.shippingPhone}
              <br />
              {order.shippingLine1}
              {order.shippingLine2 ? `, ${order.shippingLine2}` : ""}
              <br />
              {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}, {order.shippingCountry}
            </div>

            <div className="mt-6 border-t border-ink/8 pt-5">
              <h2 className="font-serif text-lg text-ink">What Happens Next</h2>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
                Your stones are inspected and insured-packed before dispatch. You&apos;ll get tracking details by
                email once your order ships — insured delivery typically takes 2–4 days domestically or 4–8 days
                internationally.
              </p>
            </div>
          </div>

          <OrderSummarySidebar
            items={order.items.map((item) => ({
              id: item.id,
              name: item.nameSnapshot,
              priceMinor: item.priceMinorSnapshot,
              quantity: item.quantity,
            }))}
            currency={order.currency}
            subtotalMinor={order.subtotalMinor}
            shippingMinor={order.shippingMinor}
            discountMinor={order.discountMinor}
            totalMinor={order.totalMinor}
          />
        </div>
      </div>
    </main>
  );
}
