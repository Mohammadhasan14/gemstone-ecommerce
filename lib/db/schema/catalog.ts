import { pgTable, pgEnum, uuid, text, integer, numeric, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const productStatusEnum = pgEnum("product_status", ["draft", "active", "sold", "archived"]);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  localName: text("local_name"),
  description: text("description"),
  parentId: uuid("parent_id"),
}, (table) => [
  uniqueIndex("categories_slug_idx").on(table.slug),
]);

export const origins = pgTable("origins", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  country: text("country").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  sku: text("sku"),
  categoryId: uuid("category_id").references(() => categories.id),
  originId: uuid("origin_id").references(() => origins.id),
  name: text("name").notNull(),
  kind: text("kind").notNull(),
  description: text("description"),
  grade: text("grade"),
  treatment: text("treatment"),
  caratWeight: numeric("carat_weight", { precision: 8, scale: 2 }),
  priceMinor: integer("price_minor").notNull(),
  currency: text("currency").notNull().default("INR"),
  status: productStatusEnum("status").notNull().default("draft"),
  isUnique: boolean("is_unique").notNull().default(true),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("products_slug_idx").on(table.slug),
]);

export const productImages = pgTable("product_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  url: text("url"),
  alt: text("alt"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const certifications = pgTable("certifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  labName: text("lab_name").notNull(),
  reportNumber: text("report_number").notNull(),
  reportUrl: text("report_url"),
  issuedAt: timestamp("issued_at", { withTimezone: true }),
});
