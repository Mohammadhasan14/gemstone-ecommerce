import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";
import { getCurrentCartReadOnly } from "@/lib/cart";
import { getCartWithItems } from "@/lib/db/queries/cart";
import { listAddresses } from "@/lib/db/queries/addresses";
import { computeOrderTotals } from "@/lib/db/queries/orders";
import { CheckoutAddressForm } from "@/components/checkout/checkout-address-form";
import { OrderSummarySidebar } from "@/components/checkout/order-summary-sidebar";

export const metadata: Metadata = { title: "Checkout — HK Gems" };

export default async function CheckoutPage() {
  const cart = await getCurrentCartReadOnly();
  const items = cart ? await getCartWithItems(cart.id) : [];

  if (items.length === 0) {
    redirect("/cart");
  }

  const user = await getUser();
  const addresses = user ? await listAddresses(user.id) : [];
  const defaultAddress = addresses.find((a) => a.isDefault && a.type === "shipping") ?? addresses[0];

  const currency = items[0]?.currency ?? "INR";
  const preview = computeOrderTotals(items, defaultAddress?.country ?? "India");

  return (
    <main className="pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
        <h1 className="font-serif text-3xl font-normal text-ink sm:text-4xl">Checkout</h1>
        <p className="mt-2 text-sm text-muted">
          {user ? "Confirm where this order should ship." : "Checking out as a guest — no account required."}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-ink/7 bg-white px-5 py-5 sm:px-6 sm:py-6">
            <CheckoutAddressForm
              prefill={{
                email: user?.email,
                fullName: defaultAddress?.fullName ?? user?.name,
                phone: defaultAddress?.phone ?? user?.phone ?? undefined,
                line1: defaultAddress?.line1,
                line2: defaultAddress?.line2 ?? undefined,
                city: defaultAddress?.city,
                state: defaultAddress?.state,
                postalCode: defaultAddress?.postalCode,
                country: defaultAddress?.country ?? "India",
              }}
            />
          </div>

          <OrderSummarySidebar
            items={items.map((item) => ({ id: item.id, name: item.name, kind: item.kind, priceMinor: item.priceMinor, quantity: item.quantity }))}
            currency={currency}
            {...preview}
          />
        </div>
      </div>
    </main>
  );
}
