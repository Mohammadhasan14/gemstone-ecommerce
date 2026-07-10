import "server-only";
import { and, asc, desc, eq, gte, lte, ilike, ne, or, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { categories, origins, products, productImages, certifications } from "@/lib/db/schema";

export type ProductSort = "newest" | "price-asc" | "price-desc";

export type ProductFilters = {
  category?: string;
  origin?: string;
  treatment?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
};

const activeProduct = eq(products.status, "active");

function productListSelect() {
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
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(origins, eq(products.originId, origins.id));
}

export async function listProducts(filters: ProductFilters = {}) {
  const conditions = [activeProduct];

  if (filters.category) conditions.push(eq(categories.slug, filters.category));
  if (filters.origin) conditions.push(eq(origins.name, filters.origin));
  if (filters.treatment) conditions.push(eq(products.treatment, filters.treatment));
  if (filters.minPrice !== undefined) conditions.push(gte(products.priceMinor, filters.minPrice));
  if (filters.maxPrice !== undefined) conditions.push(lte(products.priceMinor, filters.maxPrice));

  const orderBy =
    filters.sort === "price-asc"
      ? asc(products.priceMinor)
      : filters.sort === "price-desc"
        ? desc(products.priceMinor)
        : desc(products.createdAt);

  return productListSelect()
    .where(and(...conditions))
    .orderBy(orderBy);
}

export async function getProductBySlug(slug: string) {
  // Deliberately not filtered to status="active": a sold or archived stone should
  // still resolve to its PDP (showing a "Sold Out" state) rather than 404 just
  // because it's no longer buyable. Only unpublished drafts are hidden.
  const [product] = await db
    .select({
      id: products.id,
      slug: products.slug,
      sku: products.sku,
      name: products.name,
      kind: products.kind,
      description: products.description,
      grade: products.grade,
      treatment: products.treatment,
      caratWeight: products.caratWeight,
      priceMinor: products.priceMinor,
      currency: products.currency,
      status: products.status,
      categoryName: categories.name,
      originName: origins.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(origins, eq(products.originId, origins.id))
    .where(and(eq(products.slug, slug), ne(products.status, "draft")));

  if (!product) return null;

  const [images, productCertifications] = await Promise.all([
    db
      .select({ url: productImages.url, alt: productImages.alt })
      .from(productImages)
      .where(eq(productImages.productId, product.id))
      .orderBy(asc(productImages.sortOrder)),
    db
      .select({
        labName: certifications.labName,
        reportNumber: certifications.reportNumber,
        reportUrl: certifications.reportUrl,
      })
      .from(certifications)
      .where(eq(certifications.productId, product.id)),
  ]);

  return { ...product, images, certifications: productCertifications };
}

export async function searchProducts(query: string, limit = 8) {
  if (!query.trim()) return [];

  const pattern = `%${query.trim()}%`;

  return productListSelect()
    .where(
      and(
        activeProduct,
        or(ilike(products.name, pattern), ilike(products.kind, pattern), ilike(categories.name, pattern))
      )
    )
    .limit(limit);
}

export async function getFilterOptions() {
  const [categoryRows, originRows, treatmentRows, priceRange] = await Promise.all([
    db.selectDistinct({ slug: categories.slug, name: categories.name }).from(categories),
    db.selectDistinct({ name: origins.name }).from(origins),
    db
      .selectDistinct({ treatment: products.treatment })
      .from(products)
      .where(and(activeProduct, sql`${products.treatment} is not null`)),
    db
      .select({
        min: sql<number>`min(${products.priceMinor})`,
        max: sql<number>`max(${products.priceMinor})`,
      })
      .from(products)
      .where(activeProduct),
  ]);

  return {
    categories: categoryRows,
    origins: originRows.map((o) => o.name),
    treatments: treatmentRows.map((t) => t.treatment).filter((t): t is string => Boolean(t)),
    priceRange: { min: priceRange[0]?.min ?? 0, max: priceRange[0]?.max ?? 0 },
  };
}
