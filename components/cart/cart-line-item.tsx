"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Minus, Plus, X } from "lucide-react";
import { GemPlaceholder } from "@/components/gem-placeholder";
import { formatPriceMinor } from "@/lib/format";
import { updateCartItem, removeCartItem } from "@/actions/cart";

export type CartLine = {
  id: string;
  productId: string;
  quantity: number;
  slug: string;
  name: string;
  kind: string;
  priceMinor: number;
  currency: string;
  isUnique: boolean;
  availableQuantity: number;
  status: string;
};

export function CartLineItem({ item, onClose }: { item: CartLine; onClose?: () => void }) {
  const [isPending, startTransition] = useTransition();
  const maxQuantity = item.isUnique ? 1 : item.availableQuantity;
  const soldOut = item.status !== "active";

  return (
    <div className="flex gap-3 py-4">
      <Link href={`/gemstones/${item.slug}`} onClick={onClose} className="shrink-0">
        <GemPlaceholder hint={item.kind} shape="rounded" radius={10} className="h-16 w-16" />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/gemstones/${item.slug}`} onClick={onClose} className="text-[13.5px] font-semibold text-ink hover:text-teal">
            {item.name}
          </Link>
          <button
            type="button"
            aria-label="Remove"
            disabled={isPending}
            onClick={() => startTransition(() => removeCartItem(item.id))}
            className="text-muted hover:text-[#B4304A]"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>
        <div className="text-[12px] text-muted">{item.kind}</div>

        {soldOut ? (
          <div className="mt-1 text-[12px] font-semibold text-[#B4304A]">No longer available</div>
        ) : (
          <div className="mt-1.5 flex items-center justify-between">
            {item.isUnique ? (
              <span className="text-[12px] text-muted">Qty 1 (one-of-a-kind)</span>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={isPending}
                  onClick={() => startTransition(() => updateCartItem(item.id, item.quantity - 1))}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/15 text-ink disabled:opacity-40"
                >
                  <Minus size={12} />
                </button>
                <span className="w-5 text-center text-[13px]">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isPending || item.quantity >= maxQuantity}
                  onClick={() => startTransition(() => updateCartItem(item.id, item.quantity + 1))}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/15 text-ink disabled:opacity-40"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
            <span className="text-[13.5px] font-bold text-ink">
              {formatPriceMinor(item.priceMinor * item.quantity, item.currency)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
