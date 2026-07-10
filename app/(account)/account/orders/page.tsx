import type { Metadata } from "next";
import Link from "next/link";
import { getUser } from "@/lib/dal";
import { listOrdersForUser } from "@/lib/db/queries/orders";
import { formatPriceMinor } from "@/lib/format";

export const metadata: Metadata = { title: "Orders — HK Gems" };

const STATUS_LABELS: Record<string, string> = {
  pending: "Awaiting Payment",
  paid: "Paid",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export default async function OrdersPage() {
  const user = await getUser();
  if (!user) return null;

  const orders = await listOrdersForUser(user.id);

  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Order History</h1>
      <p className="mt-2 text-sm text-muted">Track and review your past orders.</p>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-ink/7 bg-white px-6 py-16 text-center">
          <p className="text-sm text-muted">You haven&apos;t placed any orders yet.</p>
          <Link href="/gemstones" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
            Browse gemstones
          </Link>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => {
            const href =
              order.status === "pending" ? `/checkout/payment/${order.id}` : `/checkout/confirmation/${order.id}`;
            return (
              <Link
                key={order.id}
                href={href}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/7 bg-white px-5 py-4 transition-colors hover:border-teal/40"
              >
                <div>
                  <div className="font-semibold text-ink">{order.orderNumber}</div>
                  <div className="text-[12.5px] text-muted">
                    {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-ink/5 px-3 py-1 text-[11.5px] font-semibold tracking-wide text-ink uppercase">
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="font-bold text-ink">{formatPriceMinor(order.totalMinor, order.currency)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
