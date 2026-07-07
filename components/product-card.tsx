"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { GemPlaceholder } from "./gem-placeholder";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  const toggleWishlist = () => {
    setWishlisted((prev) => {
      const next = !prev;
      toast(next ? "Added to wishlist" : "Removed from wishlist", {
        description: product.name,
      });
      return next;
    });
  };

  const addToCart = () => {
    toast.success("Added to cart", { description: `${product.name} · ${product.price}` });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/7 bg-white shadow-[0_8px_30px_-18px_rgba(16,24,22,.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_50px_-22px_rgba(16,24,22,.3)]">
      <div className="group relative overflow-hidden">
        <div className="transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
          <GemPlaceholder hint={product.imgHint} shape="rect" className="h-[240px] w-full" />
        </div>
        <span className="absolute top-3.5 left-3.5 rounded-full bg-ink/78 px-3 py-1.5 text-[10.5px] font-bold tracking-[.12em] text-[#E7D8A8] uppercase backdrop-blur-sm">
          {product.badge}
        </span>
        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-all duration-200 hover:scale-[1.08] ${
            wishlisted ? "text-[#B4304A]" : "text-charcoal hover:text-[#B4304A]"
          }`}
        >
          <Heart size={16} strokeWidth={1.8} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-0 px-5 pt-5 pb-[22px]">
        <div className="text-[11.5px] font-bold tracking-[.14em] text-teal uppercase">
          {product.kind}
        </div>
        <h3 className="mt-2 font-serif text-xl font-normal text-ink">{product.name}</h3>
        <div className="mt-2.5 flex gap-3.5 text-[12.5px] text-muted">
          <span>{product.grade}</span>
          <span>·</span>
          <span>{product.carat}</span>
          <span>·</span>
          <span>{product.origin}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-ink/7 pt-4">
          <div>
            <div className="text-lg font-bold text-ink">{product.price}</div>
            <div className="text-[11.5px] text-muted">{product.perCt}</div>
          </div>
          <button
            onClick={addToCart}
            className="rounded-full bg-teal px-[18px] py-2.5 text-[13px] font-bold text-ivory transition-colors duration-200 hover:bg-teal-dark"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
