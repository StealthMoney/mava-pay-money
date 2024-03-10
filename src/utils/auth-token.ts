import { JWTPayload, jwtVerify, SignJWT } from "jose"
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse
} from "next"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { TOKEN_EXPIRY } from "@/config/default"
import {
    API_DOMAIN,
    EMAIL_VERIFY_TEMPLATE_ID,
    JWT_SECRET_KEY
} from "@/config/process"
import { sendMail } from "@/services/mail/sendgrid"
import { VerificationRepository } from "@/services/prisma/repository"
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

import { generateEmailToken } from "./mail"

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

export async function sendVerificationToken({
    email,
    userId,
    prisma
}: {
    email: string
    userId: number
    prisma: Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$use"
        | "$extends"
    >
}) {
    try {
        const token = generateEmailToken()

        // expiry time for verification is 24 hours
        const expiresAt = new Date().getTime() + 1000 * 60 * 60 * 24
        const verification = await VerificationRepository(prisma).create({
            user: {
                connect: { id: userId }
            },
            token,
            expiresAt: new Date(expiresAt),
            userId: userId
        })

        if (verification instanceof Error) {
            throw new Error(verification.message)
        }

        const verificationUrl = `${API_DOMAIN}/account/verify?key=${token}&email=${JSON.stringify(email)}`

        const mail = await sendMail({
            from: "donotreply@mavapay.co",
            to: email,
            templateId: EMAIL_VERIFY_TEMPLATE_ID,
            dynamicTemplateData: {
                url: verificationUrl
            }
        })

        if (mail instanceof Error) {
            throw new Error(mail.message)
        }

        return verification
    } catch (error) {
        return new Error(
            error instanceof Error ? error.message : "Token verification failed"
        )
    }
}

export function auth(
    ...args:
        | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, authOptions)
}
