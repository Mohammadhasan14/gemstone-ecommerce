import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { orders, orderItems, payments, products } from "@/lib/db/schema";
import type { getCartWithItems } from "./cart";

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HK-${stamp}-${suffix}`;
}

export type ShippingDetails = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type CartLine = Awaited<ReturnType<typeof getCartWithItems>>[number];

// Domestic shipping is already advertised as complimentary sitewide; international
// carries a flat placeholder fee until a real carrier-rate lookup exists.
const INTERNATIONAL_SHIPPING_MINOR = 250000;

export function computeOrderTotals(items: CartLine[], country: string, discount?: { type: "percent" | "fixed"; value: number }) {
  const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);
  const shippingMinor = country.trim().toLowerCase() === "india" ? 0 : INTERNATIONAL_SHIPPING_MINOR;
  const taxMinor = 0; // Placeholder — real GST calculation is out of scope for now.

  let discountMinor = 0;
  if (discount) {
    discountMinor =
      discount.type === "percent" ? Math.round((subtotalMinor * discount.value) / 100) : discount.value;
    discountMinor = Math.min(discountMinor, subtotalMinor);
  }

  const totalMinor = subtotalMinor + shippingMinor + taxMinor - discountMinor;
  return { subtotalMinor, shippingMinor, taxMinor, discountMinor, totalMinor };
}

export async function createOrderFromCart(params: {
  items: CartLine[];
  userId?: string;
  email: string;
  shipping: ShippingDetails;
  discountCode?: string;
  discount?: { type: "percent" | "fixed"; value: number };
}) {
  const totals = computeOrderTotals(params.items, params.shipping.country, params.discount);

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber: generateOrderNumber(),
      userId: params.userId,
      email: params.email,
      status: "pending",
      shippingFullName: params.shipping.fullName,
      shippingPhone: params.shipping.phone,
      shippingLine1: params.shipping.line1,
      shippingLine2: params.shipping.line2,
      shippingCity: params.shipping.city,
      shippingState: params.shipping.state,
      shippingPostalCode: params.shipping.postalCode,
      shippingCountry: params.shipping.country,
      discountCode: params.discountCode,
      ...totals,
    })
    .returning();

  if (params.items.length > 0) {
    await db.insert(orderItems).values(
      params.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        nameSnapshot: item.name,
        priceMinorSnapshot: item.priceMinor,
        quantity: item.quantity,
      }))
    );
  }

  await db.insert(payments).values({
    orderId: order.id,
    provider: "razorpay",
    status: "created",
    amountMinor: totals.totalMinor,
  });

  return order;
}

export async function getOrderById(orderId: string) {
  const [order] = await db.select().from(orders).where(eq(orders.id, orderId));
  if (!order) return null;

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  return { ...order, items };
}

export async function listOrdersForUser(userId: string) {
  return db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.placedAt));
}

// Marks the order + payment as paid and flips inventory: one-of-a-kind stones go
// straight to `sold` (can't be decremented twice by concurrent checkouts), lot-sold
// stones decrement by the ordered quantity. The `eq(products.status, "active")` guard
// means a second concurrent attempt to sell the same unique stone is a no-op here.
export async function markOrderPaid(orderId: string, providerPaymentId: string, rawPayload: string) {
  return db.transaction(async (tx) => {
    const [order] = await tx.select().from(orders).where(eq(orders.id, orderId));
    if (!order || order.status !== "pending") return null;

    await tx.update(orders).set({ status: "paid" }).where(eq(orders.id, orderId));
    await tx
      .update(payments)
      .set({ status: "captured", providerPaymentId, rawPayload })
      .where(eq(payments.orderId, orderId));

    const items = await tx.select().from(orderItems).where(eq(orderItems.orderId, orderId));

    for (const item of items) {
      const [product] = await tx
        .select({ isUnique: products.isUnique, quantity: products.quantity })
        .from(products)
        .where(eq(products.id, item.productId));
      if (!product) continue;

      if (product.isUnique) {
        await tx
          .update(products)
          .set({ status: "sold" })
          .where(and(eq(products.id, item.productId), eq(products.status, "active")));
      } else {
        await tx
          .update(products)
          .set({ quantity: Math.max(product.quantity - item.quantity, 0) })
          .where(eq(products.id, item.productId));
      }
    }

    return { ...order, status: "paid" as const };
  });
}
