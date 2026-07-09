"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { toggleWishlist } from "@/actions/wishlist";

export function WishlistButton({
  productId,
  productName,
  initialWishlisted = false,
}: {
  productId: string;
  productName: string;
  initialWishlisted?: boolean;
}) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(async () => {
          const result = await toggleWishlist(productId);
          if (!result.ok) {
            toast("Log in to save items to your wishlist", {
              action: { label: "Log In", onClick: () => router.push("/login") },
            });
            return;
          }
          setWishlisted(result.wishlisted);
          toast(result.wishlisted ? "Added to wishlist" : "Removed from wishlist", {
            description: productName,
          });
        });
      }}
      disabled={isPending}
      aria-label="Add to wishlist"
      aria-pressed={wishlisted}
      className={`absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-transform active:scale-90 disabled:opacity-60 sm:top-3.5 sm:right-3.5 sm:h-9 sm:w-9 ${
        wishlisted ? "text-[#B4304A]" : "text-charcoal hover:text-[#B4304A]"
      }`}
    >
      <Heart size={15} strokeWidth={1.8} fill={wishlisted ? "currentColor" : "none"} />
    </button>
  );
}
