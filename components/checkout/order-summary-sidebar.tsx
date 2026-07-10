import { formatPriceMinor } from "@/lib/format";

type Line = { id: string; name: string; kind?: string; priceMinor: number; quantity: number };

export function OrderSummarySidebar({
  items,
  currency,
  subtotalMinor,
  shippingMinor,
  discountMinor,
  totalMinor,
}: {
  items: Line[];
  currency: string;
  subtotalMinor: number;
  shippingMinor: number;
  discountMinor: number;
  totalMinor: number;
}) {
  return (
    <div className="rounded-2xl border border-ink/7 bg-white px-5 py-5 sm:px-6 sm:py-6">
      <h2 className="font-serif text-lg text-ink">Order Summary</h2>

      <div className="mt-4 flex flex-col gap-3 border-b border-ink/8 pb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 text-[13px]">
            <div>
              <div className="font-semibold text-ink">{item.name}</div>
              {item.kind && <div className="text-muted">{item.kind}</div>}
              {item.quantity > 1 && <div className="text-muted">Qty {item.quantity}</div>}
            </div>
            <span className="shrink-0 font-semibold text-ink">
              {formatPriceMinor(item.priceMinor * item.quantity, currency)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-[13.5px]">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span>{formatPriceMinor(subtotalMinor, currency)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Shipping</span>
          <span>{shippingMinor === 0 ? "Complimentary" : formatPriceMinor(shippingMinor, currency)}</span>
        </div>
        {discountMinor > 0 && (
          <div className="flex justify-between text-teal">
            <span>Discount</span>
            <span>-{formatPriceMinor(discountMinor, currency)}</span>
          </div>
        )}
        <div className="mt-2 flex justify-between border-t border-ink/8 pt-3 text-[16px] font-bold text-ink">
          <span>Total</span>
          <span>{formatPriceMinor(totalMinor, currency)}</span>
        </div>
      </div>
    </div>
  );
}
