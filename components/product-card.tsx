"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { GemPlaceholder } from "./gem-placeholder";
import { EASE_OUT } from "./motion";
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
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/7 bg-white shadow-[0_8px_30px_-18px_rgba(16,24,22,.18)] transition-shadow duration-300 hover:shadow-[0_26px_50px_-22px_rgba(16,24,22,.3)] sm:rounded-[20px]"
    >
      <div className="group relative overflow-hidden">
        <div className="transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
          <GemPlaceholder hint={product.imgHint} shape="rect" className="h-[130px] w-full sm:h-[190px] lg:h-[240px]" />
        </div>
        <span className="absolute top-2.5 left-2.5 rounded-full bg-ink/78 px-2.5 py-1 text-[9px] font-bold tracking-[.1em] text-[#E7D8A8] uppercase backdrop-blur-sm sm:top-3.5 sm:left-3.5 sm:px-3 sm:py-1.5 sm:text-[10.5px] sm:tracking-[.12em]">
          {product.badge}
        </span>
        <motion.button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          aria-pressed={wishlisted}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 sm:top-3 sm:right-3 sm:h-9 sm:w-9 ${
            wishlisted ? "text-[#B4304A]" : "text-charcoal hover:text-[#B4304A]"
          }`}
        >
          <Heart size={14} strokeWidth={1.8} className="sm:hidden" fill={wishlisted ? "currentColor" : "none"} />
          <Heart size={16} strokeWidth={1.8} className="hidden sm:block" fill={wishlisted ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col gap-0 px-3 pt-3 pb-3.5 sm:px-5 sm:pt-5 sm:pb-[22px]">
        <div className="text-[9.5px] font-bold tracking-[.1em] text-teal uppercase sm:text-[11.5px] sm:tracking-[.14em]">
          {product.kind}
        </div>
        <h3 className="mt-1.5 font-serif text-[15px] font-normal text-ink sm:mt-2 sm:text-xl">{product.name}</h3>
        <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10.5px] text-muted sm:mt-2.5 sm:gap-x-3.5 sm:text-[12.5px]">
          <span>{product.grade}</span>
          <span className="hidden sm:inline">·</span>
          <span>{product.carat}</span>
          <span className="hidden sm:inline">·</span>
          <span>{product.origin}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-ink/7 pt-3 sm:mt-4 sm:pt-4">
          <div>
            <div className="text-[15px] font-bold text-ink sm:text-lg">{product.price}</div>
            <div className="text-[10px] text-muted sm:text-[11.5px]">{product.perCt}</div>
          </div>
          <motion.button
            onClick={addToCart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-teal px-3 py-2 text-[11px] font-bold text-ivory transition-colors duration-200 hover:bg-teal-dark sm:px-[18px] sm:py-2.5 sm:text-[13px]"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
