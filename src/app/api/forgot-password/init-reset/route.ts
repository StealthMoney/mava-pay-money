import { SignJWT } from "jose"

import {
    API_DOMAIN,
    JWT_SECRET_KEY,
    PASSWORD_RESET_TEMPLATE_ID
} from "@/config/process"
import { prisma } from "@/lib/prisma"
import { sendMail } from "@/services/mail/sendgrid"
import { UserRepository } from "@/services/prisma/repository"

export async function POST(req: Request) {
    const { email } = (await req.json()) as { email: string }
    if (!email.includes("@") || !email.includes(".")) {
        return new Response(JSON.stringify({ error: "Invalid email" }), {
            status: 400
        })
    }
    const user = await UserRepository(prisma).getUserByEmail(email)
    if (user instanceof Error) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 400
        })
    }
    const token = await new SignJWT({ email, type: "password-reset" })
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime("15m")
        .sign(JWT_SECRET_KEY)
    const resetUrl = `${process.env.VERCEL_URL ?? API_DOMAIN}/reset-password?token=${token}`

    try {
        await sendMail({
            from: "noreply@mavapay.co",
            to: email,
            templateId: PASSWORD_RESET_TEMPLATE_ID,
            dynamicTemplateData: {
                url: resetUrl
            }
        })
        return new Response(JSON.stringify({ message: "Email sent" }), {
            status: 200
        })
    } catch (error) {
        return new Response(
            JSON.stringify({
                error:
                    error instanceof Error
                        ? error.message
                        : "Password reset failed. Please try again."
            }),
            {
                status: 500
            }
        )
    }
}
