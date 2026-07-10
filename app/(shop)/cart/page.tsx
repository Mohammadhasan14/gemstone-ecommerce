import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentCartReadOnly } from "@/lib/cart";
import { getCartWithItems } from "@/lib/db/queries/cart";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartSummary } from "@/components/cart/cart-summary";

export const metadata: Metadata = { title: "Your Cart — HK Gems" };

export default async function CartPage() {
  const cart = await getCurrentCartReadOnly();
  const items = cart ? await getCartWithItems(cart.id) : [];
  const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
  const currency = items[0]?.currency ?? "INR";

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <h1 className="font-serif text-3xl font-normal text-ink sm:text-4xl">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-ink/7 bg-white px-6 py-16 text-center">
            <p className="text-sm text-muted">Your cart is empty.</p>
            <Link href="/gemstones" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
              Browse gemstones
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            <div className="divide-y divide-ink/6 rounded-2xl border border-ink/7 bg-white px-5 sm:px-6">
              {items.map((item) => (
                <CartLineItem key={item.id} item={item} />
              ))}
            </div>
            <div className="rounded-2xl border border-ink/7 bg-white px-5 py-5 sm:px-6">
              <CartSummary subtotalMinor={subtotalMinor} currency={currency} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
