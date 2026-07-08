import "server-only";
import { cache } from "react";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { sessions, users } from "@/lib/db/schema";
import { decrypt, getSessionCookie } from "@/lib/session";

// Secure check: verifies the session id from the cookie against the DB session row.
// Returns null rather than redirecting — protected routes decide their own redirect target.
export const verifySession = cache(async () => {
  const token = await getSessionCookie();
  const payload = await decrypt(token);
  if (!payload?.sessionId) return null;

  const [session] = await db
    .select({ userId: sessions.userId })
    .from(sessions)
    .where(and(eq(sessions.id, payload.sessionId), gt(sessions.expiresAt, new Date())));

  if (!session) return null;

  return { isAuth: true as const, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const [user] = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.id, session.userId));

  return user ?? null;
});
