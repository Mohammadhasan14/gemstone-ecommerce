import "server-only";
import { verifySession } from "@/lib/dal";
import { getOrCreateGuestCartToken, getGuestCartToken, clearGuestCartToken } from "@/lib/cart-session";
import * as cartQueries from "@/lib/db/queries/cart";

// Creates a cart (and, for guests, sets a cookie) if none exists yet. Only safe to
// call from Server Actions/Route Handlers — cookies() can't be written during a
// Server Component render.
export async function getOrCreateCurrentCart() {
  const session = await verifySession();

  if (session) {
    const existing = await cartQueries.getCartForUser(session.userId);
    return existing ?? cartQueries.createCart({ userId: session.userId });
  }

  const token = await getOrCreateGuestCartToken();
  const existing = await cartQueries.getCartForGuest(token);
  return existing ?? cartQueries.createCart({ guestToken: token });
}

// Side-effect-free variant for rendering (header badge, cart page) — never creates
// a cart or cookie, just reports what's already there.
export async function getCurrentCartReadOnly() {
  const session = await verifySession();
  if (session) return cartQueries.getCartForUser(session.userId);

  const token = await getGuestCartToken();
  if (!token) return null;
  return cartQueries.getCartForGuest(token);
}

// Called from login()/signup() once the session exists — folds any guest cart
// (added to before the user signed in) into their account cart.
export async function mergeGuestCartOnLogin(userId: string) {
  const guestToken = await getGuestCartToken();
  if (!guestToken) return;

  const guestCart = await cartQueries.getCartForGuest(guestToken);
  if (guestCart) {
    await cartQueries.claimOrMergeGuestCart(guestCart.id, userId);
  }

  await clearGuestCartToken();
}
