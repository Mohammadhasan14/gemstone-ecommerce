"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export function WishlistButton({ productName }: { productName: string }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlisted((prev) => {
          const next = !prev;
          toast(next ? "Added to wishlist" : "Removed from wishlist", {
            description: productName,
          });
          return next;
        });
      }}
      aria-label="Add to wishlist"
      aria-pressed={wishlisted}
      className={`absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-transform active:scale-90 sm:top-3.5 sm:right-3.5 sm:h-9 sm:w-9 ${
        wishlisted ? "text-[#B4304A]" : "text-charcoal hover:text-[#B4304A]"
      }`}
    >
      <Heart size={15} strokeWidth={1.8} fill={wishlisted ? "currentColor" : "none"} />
    </button>
  );
}
