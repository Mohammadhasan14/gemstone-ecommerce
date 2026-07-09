import { pgTable, uuid, text, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./identity";
import { products } from "./catalog";

export const wishlistItems = pgTable("wishlist_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("wishlist_items_user_product_idx").on(table.userId, table.productId),
]);

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  meta: text("meta").notNull(),
  quote: text("quote").notNull(),
  published: boolean("published").notNull().default(true),
});

export const guides = pgTable("guides", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull(),
  tag: text("tag").notNull(),
  title: text("title").notNull(),
  coverImageHint: text("cover_image_hint"),
  bodyMarkdown: text("body_markdown"),
  readMinutes: integer("read_minutes"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
}, (table) => [
  uniqueIndex("guides_slug_idx").on(table.slug),
]);
