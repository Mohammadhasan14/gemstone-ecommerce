import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getOrderById } from "@/lib/db/queries/orders";
import { isRazorpayConfigured } from "@/lib/payments/razorpay";
import { OrderSummarySidebar } from "@/components/checkout/order-summary-sidebar";
import { PaymentPanel } from "@/components/checkout/payment-panel";

export const metadata: Metadata = { title: "Payment — HK Gems" };

export default async function PaymentPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);
  if (!order) notFound();

  if (order.status !== "pending") {
    redirect(`/checkout/confirmation/${order.id}`);
  }

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <h1 className="font-serif text-3xl font-normal text-ink sm:text-4xl">Payment</h1>
        <p className="mt-2 text-sm text-muted">Order {order.orderNumber}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <PaymentPanel orderId={order.id} isRazorpayConfigured={isRazorpayConfigured()} />

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
