import Link from "next/link";
import { formatPriceMinor } from "@/lib/format";

export function CartSummary({
  subtotalMinor,
  currency,
  onCheckoutClick,
}: {
  subtotalMinor: number;
  currency: string;
  onCheckoutClick?: () => void;
}) {
  return (
    <div className="border-t border-ink/8 pt-4">
      <div className="flex items-center justify-between text-[15px]">
        <span className="font-semibold text-ink">Subtotal</span>
        <span className="font-bold text-ink">{formatPriceMinor(subtotalMinor, currency)}</span>
      </div>
      <p className="mt-1.5 text-[12px] text-muted">Shipping and any discount are calculated at checkout.</p>
      <Link
        href="/checkout"
        onClick={onCheckoutClick}
        className="mt-4 block w-full rounded-full bg-teal px-6 py-3 text-center text-[14px] font-bold text-ivory transition-colors hover:bg-teal-dark"
      >
        Checkout
      </Link>
    </div>
  );
}
