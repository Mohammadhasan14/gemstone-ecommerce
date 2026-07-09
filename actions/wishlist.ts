"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { toggleWishlistItem } from "@/lib/db/queries/wishlist";

export async function toggleWishlist(productId: string) {
  const session = await verifySession();
  if (!session) {
    return { ok: false as const, reason: "unauthenticated" as const };
  }

  const result = await toggleWishlistItem(session.userId, productId);
  revalidatePath("/account/wishlist");
  return { ok: true as const, wishlisted: result.wishlisted };
}
