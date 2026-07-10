import "server-only";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const CART_COOKIE = "cart_token";
const CART_TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000;

// Identifies a guest's cart across requests. Not a secret — just an unguessable
// (122-bit random) pointer to a cart row, so it doesn't need JWT signing like the
// session cookie does.
export async function getOrCreateGuestCartToken() {
  const cookieStore = await cookies();
  const existing = cookieStore.get(CART_COOKIE)?.value;
  if (existing) return existing;

  const token = randomUUID();
  cookieStore.set(CART_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_TOKEN_TTL_MS / 1000,
  });
  return token;
}

export async function getGuestCartToken() {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value ?? null;
}

export async function clearGuestCartToken() {
  const cookieStore = await cookies();
  cookieStore.delete(CART_COOKIE);
}
