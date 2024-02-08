import { JWTPayload, jwtVerify, SignJWT } from "jose";

import { JWT_SECRET_KEY } from "@/config/process";
import { TOKEN_EXPIRY } from "@/config/default";

interface TokenPayload {
  userId: string;
  expiry?: number;
}

export async function createToken({
  userId,
  expiry,
}: TokenPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = expiry ?? iat + TOKEN_EXPIRY;

  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET_KEY);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export async function createRefreshToken({
  userId,
  expiry,
}: TokenPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = expiry ?? iat + 604800; // 604800 seconds (7 days)

  return new SignJWT({ userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(JWT_SECRET_KEY);
}
