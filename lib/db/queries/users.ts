import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user ?? null;
}

export async function createUser(data: { name: string; email: string; passwordHash: string; phone?: string }) {
  const [user] = await db.insert(users).values(data).returning({ id: users.id });
  return user;
}

export async function updateProfile(userId: string, data: { name: string; phone?: string }) {
  await db.update(users).set(data).where(eq(users.id, userId));
}
