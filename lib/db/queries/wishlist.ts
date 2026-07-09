import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { wishlistItems, products, categories, origins, productImages } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function listWishlistProductIds(userId: string) {
  const rows = await db
    .select({ productId: wishlistItems.productId })
    .from(wishlistItems)
    .where(eq(wishlistItems.userId, userId));
  return new Set(rows.map((r) => r.productId));
}

export async function listWishlistProducts(userId: string) {
  return db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      kind: products.kind,
      grade: products.grade,
      treatment: products.treatment,
      caratWeight: products.caratWeight,
      priceMinor: products.priceMinor,
      currency: products.currency,
      categoryName: categories.name,
      categorySlug: categories.slug,
      originName: origins.name,
      imageHint: sql<string | null>`(
        select alt from ${productImages}
        where ${productImages.productId} = ${products.id}
        order by ${productImages.sortOrder} asc
        limit 1
      )`,
    })
    .from(wishlistItems)
    .innerJoin(products, eq(wishlistItems.productId, products.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(origins, eq(products.originId, origins.id))
    .where(eq(wishlistItems.userId, userId))
    .orderBy(wishlistItems.createdAt);
}

export async function toggleWishlistItem(userId: string, productId: string) {
  const [existing] = await db
    .select({ id: wishlistItems.id })
    .from(wishlistItems)
    .where(and(eq(wishlistItems.userId, userId), eq(wishlistItems.productId, productId)));

  if (existing) {
    await db.delete(wishlistItems).where(eq(wishlistItems.id, existing.id));
    return { wishlisted: false };
  }

  await db.insert(wishlistItems).values({ userId, productId });
  return { wishlisted: true };
}
