import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Orders — HK Gems" };

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Order History</h1>
      <p className="mt-2 text-sm text-muted">Track and review your past orders.</p>

      <div className="mt-6 rounded-2xl border border-ink/7 bg-white px-6 py-16 text-center">
        <p className="text-sm text-muted">You haven&apos;t placed any orders yet.</p>
        <Link href="/gemstones" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
          Browse gemstones
        </Link>
      </div>
    </div>
  );
}
