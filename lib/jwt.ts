import "server-only";
import { SignJWT, jwtVerify } from "jose";

// Split out from session.ts so proxy.ts can do its cookie-only check without
// transitively importing the DB client (next/headers cookies() + postgres) —
// Next's own guidance: Proxy should never touch the database.

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) throw new Error("SESSION_SECRET is not set");
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  sessionId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ sessionId: payload.sessionId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.expiresAt))
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    return payload as { sessionId: string };
  } catch {
    return null;
  }
}
