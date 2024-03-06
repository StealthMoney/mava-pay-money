import { JWTPayload, jwtVerify, SignJWT } from "jose"

import { JWT_SECRET_KEY } from "@/config/process"
import { TOKEN_EXPIRY } from "@/config/default"

interface TokenPayload {
    data: Record<string, unknown>
    expiry?: number
}

export async function createToken({
    data,
    expiry
}: TokenPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = expiry ?? iat + TOKEN_EXPIRY

    return new SignJWT({ ...data, type: "access" })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(JWT_SECRET_KEY)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
            algorithms: ["HS256"]
        })
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return null
        }
        if (payload.iat && Date.now() < payload.iat * 1000) {
            return null
        }
        return payload
    } catch (error) {
        console.error("Token verification error:", error)
        return null
    }
}

export async function createRefreshToken({
    data,
    expiry
}: TokenPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)
    const exp = expiry ?? iat + 604800 // 604800 seconds (7 days)

    return new SignJWT({ ...data, type: "refresh" })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt(iat)
        .setExpirationTime(exp)
        .sign(JWT_SECRET_KEY)
}
