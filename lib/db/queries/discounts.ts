import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { discounts } from "@/lib/db/schema";

export async function getActiveDiscountByCode(code: string, subtotalMinor: number) {
  const [discount] = await db
    .select()
    .from(discounts)
    .where(eq(discounts.code, code.trim().toUpperCase()));

  if (!discount) return { ok: false as const, reason: "Discount code not found." };
  if (discount.expiresAt && discount.expiresAt.getTime() < Date.now()) {
    return { ok: false as const, reason: "This discount code has expired." };
  }
  if (discount.usageLimit !== null && discount.usedCount >= discount.usageLimit) {
    return { ok: false as const, reason: "This discount code has been fully redeemed." };
  }
  if (subtotalMinor < discount.minSubtotalMinor) {
    return { ok: false as const, reason: `Minimum order value not met for this code.` };
  }

  return { ok: true as const, discount };
}

export async function incrementDiscountUsage(code: string) {
  await db
    .update(discounts)
    .set({ usedCount: sql`${discounts.usedCount} + 1` })
    .where(eq(discounts.code, code.trim().toUpperCase()));
}
