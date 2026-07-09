import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { addresses } from "@/lib/db/schema";

export type AddressInput = {
  label?: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: "shipping" | "billing";
  isDefault?: boolean;
};

export async function listAddresses(userId: string) {
  return db.select().from(addresses).where(eq(addresses.userId, userId)).orderBy(addresses.createdAt);
}

export async function getAddress(id: string, userId: string) {
  const [address] = await db
    .select()
    .from(addresses)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
  return address ?? null;
}

async function clearDefault(userId: string, type: "shipping" | "billing") {
  await db
    .update(addresses)
    .set({ isDefault: false })
    .where(and(eq(addresses.userId, userId), eq(addresses.type, type)));
}

export async function createAddress(userId: string, data: AddressInput) {
  if (data.isDefault) await clearDefault(userId, data.type);
  const [address] = await db
    .insert(addresses)
    .values({ ...data, userId })
    .returning({ id: addresses.id });
  return address;
}

export async function updateAddress(id: string, userId: string, data: AddressInput) {
  if (data.isDefault) await clearDefault(userId, data.type);
  await db
    .update(addresses)
    .set(data)
    .where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
}

export async function deleteAddress(id: string, userId: string) {
  await db.delete(addresses).where(and(eq(addresses.id, id), eq(addresses.userId, userId)));
}
