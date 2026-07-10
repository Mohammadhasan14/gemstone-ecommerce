import { pgTable, pgEnum, uuid, text, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./identity";
import { products } from "./catalog";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
]);

export const paymentStatusEnum = pgEnum("payment_status", ["created", "captured", "failed", "refunded"]);

export const discountTypeEnum = pgEnum("discount_type", ["percent", "fixed"]);

export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  guestToken: text("guest_token"),
  currency: text("currency").notNull().default("INR"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("carts_user_id_idx").on(table.userId),
  uniqueIndex("carts_guest_token_idx").on(table.guestToken),
]);

export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  cartId: uuid("cart_id").notNull().references(() => carts.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  priceMinorSnapshot: integer("price_minor_snapshot").notNull(),
}, (table) => [
  uniqueIndex("cart_items_cart_product_idx").on(table.cartId, table.productId),
]);

// Shipping/billing are captured as a snapshot on the order itself (not a live FK to
// addresses) so a later address-book edit or deletion never rewrites order history,
// and so guest checkout (no user_id, no address-book row) works the same way.
export const orders = pgTable("orders", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderNumber: text("order_number").notNull(),
  userId: uuid("user_id").references(() => users.id),
  email: text("email").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),

  shippingFullName: text("shipping_full_name").notNull(),
  shippingPhone: text("shipping_phone").notNull(),
  shippingLine1: text("shipping_line1").notNull(),
  shippingLine2: text("shipping_line2"),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state").notNull(),
  shippingPostalCode: text("shipping_postal_code").notNull(),
  shippingCountry: text("shipping_country").notNull().default("India"),

  subtotalMinor: integer("subtotal_minor").notNull(),
  shippingMinor: integer("shipping_minor").notNull().default(0),
  taxMinor: integer("tax_minor").notNull().default(0),
  discountMinor: integer("discount_minor").notNull().default(0),
  totalMinor: integer("total_minor").notNull(),
  currency: text("currency").notNull().default("INR"),

  discountCode: text("discount_code"),
  placedAt: timestamp("placed_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("orders_order_number_idx").on(table.orderNumber),
]);

export const orderItems = pgTable("order_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: uuid("product_id").notNull().references(() => products.id),
  nameSnapshot: text("name_snapshot").notNull(),
  caratSnapshot: text("carat_snapshot"),
  priceMinorSnapshot: integer("price_minor_snapshot").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  provider: text("provider").notNull().default("razorpay"),
  providerPaymentId: text("provider_payment_id"),
  status: paymentStatusEnum("status").notNull().default("created"),
  amountMinor: integer("amount_minor").notNull(),
  rawPayload: text("raw_payload"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const shipments = pgTable("shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  carrier: text("carrier"),
  trackingNumber: text("tracking_number"),
  status: text("status").notNull().default("pending"),
  shippedAt: timestamp("shipped_at", { withTimezone: true }),
  deliveredAt: timestamp("delivered_at", { withTimezone: true }),
});

export const discounts = pgTable("discounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull(),
  type: discountTypeEnum("type").notNull(),
  value: integer("value").notNull(),
  minSubtotalMinor: integer("min_subtotal_minor").notNull().default(0),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  usageLimit: integer("usage_limit"),
  usedCount: integer("used_count").notNull().default(0),
}, (table) => [
  uniqueIndex("discounts_code_idx").on(table.code),
]);
