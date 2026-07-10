"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart";

export function AddToCartForm({
  productId,
  productName,
  price,
  disabled = false,
}: {
  productId: string;
  productName: string;
  price: string;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (disabled) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full bg-ink/10 px-6 py-3.5 text-[14px] font-bold text-muted sm:w-auto sm:px-9"
      >
        Sold Out
      </button>
    );
  }

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await addToCart(productId, 1);
          toast.success("Added to cart", { description: `${productName} · ${price}` });
        })
      }
      className="w-full rounded-full bg-teal px-6 py-3.5 text-[14px] font-bold text-ivory transition-colors duration-200 hover:bg-teal-dark disabled:opacity-60 sm:w-auto sm:px-9"
    >
      {isPending ? "Adding…" : "Add to Cart"}
    </button>
  );
}
