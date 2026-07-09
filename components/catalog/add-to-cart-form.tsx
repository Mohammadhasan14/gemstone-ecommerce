"use client";

import { toast } from "sonner";

// Placeholder until Phase 3 (Cart & checkout) wires this to a real cart — mirrors
// the same toast-stub pattern already shipped on the homepage's ProductCard.
export function AddToCartForm({ productName, price }: { productName: string; price: string }) {
  return (
    <button
      onClick={() => toast.success("Added to cart", { description: `${productName} · ${price}` })}
      className="w-full rounded-full bg-teal px-6 py-3.5 text-[14px] font-bold text-ivory transition-colors duration-200 hover:bg-teal-dark sm:w-auto sm:px-9"
    >
      Add to Cart
    </button>
  );
}
