import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { carts, cartItems, products, categories } from "@/lib/db/schema";

export async function getCartForUser(userId: string) {
  const [cart] = await db.select().from(carts).where(eq(carts.userId, userId));
  return cart ?? null;
}

export async function getCartForGuest(guestToken: string) {
  const [cart] = await db.select().from(carts).where(eq(carts.guestToken, guestToken));
  return cart ?? null;
}

export async function createCart(data: { userId?: string; guestToken?: string }) {
  const [cart] = await db.insert(carts).values(data).returning();
  return cart;
}

// Cart display and checkout totals always use the *live* product price — priceMinorSnapshot
// on cart_items is set at add-time as an audit trail only, per the roadmap's "price
// snapshotted at add-time, re-validated at checkout" note.
export async function getCartWithItems(cartId: string) {
  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      slug: products.slug,
      name: products.name,
      kind: products.kind,
      categoryName: categories.name,
      priceMinor: products.priceMinor,
      currency: products.currency,
      isUnique: products.isUnique,
      availableQuantity: products.quantity,
      status: products.status,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(cartItems.cartId, cartId));

  return items;
}

export async function getCartItemCount(cartId: string) {
  const [row] = await db
    .select({ count: sql<number>`coalesce(sum(${cartItems.quantity}), 0)` })
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));
  return row?.count ?? 0;
}

export async function addCartItem(cartId: string, productId: string, quantity: number) {
  const [product] = await db
    .select({ isUnique: products.isUnique, quantity: products.quantity, priceMinor: products.priceMinor })
    .from(products)
    .where(eq(products.id, productId));
  if (!product) throw new Error("Product not found");

  const maxQuantity = product.isUnique ? 1 : product.quantity;

  const [existing] = await db
    .select({ id: cartItems.id, quantity: cartItems.quantity })
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.productId, productId)));

  if (existing) {
    const nextQuantity = Math.min(existing.quantity + quantity, maxQuantity);
    await db.update(cartItems).set({ quantity: nextQuantity }).where(eq(cartItems.id, existing.id));
  } else {
    await db.insert(cartItems).values({
      cartId,
      productId,
      quantity: Math.min(quantity, maxQuantity),
      priceMinorSnapshot: product.priceMinor,
    });
  }

  await db.update(carts).set({ updatedAt: new Date() }).where(eq(carts.id, cartId));
}

export async function updateCartItemQuantity(cartItemId: string, cartId: string, quantity: number) {
  if (quantity <= 0) {
    await db.delete(cartItems).where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cartId)));
    return;
  }

  const [row] = await db
    .select({ isUnique: products.isUnique, availableQuantity: products.quantity })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cartId)));
  if (!row) return;

  const maxQuantity = row.isUnique ? 1 : row.availableQuantity;
  await db
    .update(cartItems)
    .set({ quantity: Math.min(quantity, maxQuantity) })
    .where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cartId)));
}

export async function removeCartItem(cartItemId: string, cartId: string) {
  await db.delete(cartItems).where(and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, cartId)));
}

export async function clearCart(cartId: string) {
  await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
}

// Combines a guest cart into a user's cart on login, keyed by product (summing
// quantities, capped by availability), then discards the now-empty guest cart.
async function mergeGuestCartIntoUserCart(guestCartId: string, userCartId: string) {
  const guestItems = await db
    .select({ productId: cartItems.productId, quantity: cartItems.quantity })
    .from(cartItems)
    .where(eq(cartItems.cartId, guestCartId));

  for (const item of guestItems) {
    await addCartItem(userCartId, item.productId, item.quantity);
  }

  await db.delete(cartItems).where(eq(cartItems.cartId, guestCartId));
  await db.delete(carts).where(eq(carts.id, guestCartId));
}

// Called once at login/signup. If the user has no cart yet, the guest cart is simply
// reassigned to them (cheaper than merging into a freshly-created empty cart).
export async function claimOrMergeGuestCart(guestCartId: string, userId: string) {
  const existingUserCart = await getCartForUser(userId);

  if (!existingUserCart) {
    const [claimed] = await db
      .update(carts)
      .set({ userId, guestToken: null })
      .where(eq(carts.id, guestCartId))
      .returning();
    return claimed;
  }

  await mergeGuestCartIntoUserCart(guestCartId, existingUserCart.id);
  return existingUserCart;
}
