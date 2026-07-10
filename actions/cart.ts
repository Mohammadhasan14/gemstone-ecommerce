"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateCurrentCart } from "@/lib/cart";
import * as cartQueries from "@/lib/db/queries/cart";

export async function addToCart(productId: string, quantity: number = 1) {
  const cart = await getOrCreateCurrentCart();
  await cartQueries.addCartItem(cart.id, productId, quantity);
  revalidatePath("/", "layout");
  return { ok: true as const };
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  const cart = await getOrCreateCurrentCart();
  await cartQueries.updateCartItemQuantity(cartItemId, cart.id, quantity);
  revalidatePath("/", "layout");
}

export async function removeCartItem(cartItemId: string) {
  const cart = await getOrCreateCurrentCart();
  await cartQueries.removeCartItem(cartItemId, cart.id);
  revalidatePath("/", "layout");
}
