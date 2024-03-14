import { prisma } from "@/lib/prisma"
import { UserRepository } from "@/services/prisma/repository"
import { verifyToken } from "@/utils/auth-token"
import { createPassword } from "@/utils/password"

export async function POST(req: Request) {
    const { token, password } = await req.json()
    if (!token || !password) {
        return new Response(
            JSON.stringify({ error: "missing fields - token, password" }),
            {
                status: 400
            }
        )
    }
    const payload = await verifyToken(token)
    if (!payload) {
        return new Response(
            JSON.stringify({ error: "Invalid token. This link has expired." }),
            {
                status: 400
            }
        )
    }
    if (payload.type !== "password-reset") {
        return new Response(
            JSON.stringify({ error: "Invalid token. This link has expired" }),
            {
                status: 400
            }
        )
    }

    const user = await UserRepository(prisma).getUserByEmail(
        payload.email as string
    )
    if (user instanceof Error) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 400
        })
    }
    const hashedPassword = await createPassword(password)
    const updatedUser = await UserRepository(prisma).updateUser({
        user: {
            ...user,
            password: hashedPassword,
            account: undefined
        },
        userId: user.id
    })
    if (updatedUser instanceof Error) {
        return new Response(
            JSON.stringify({ error: "Password reset failed" }),
            {
                status: 500
            }
        )
    }
    return new Response(
        JSON.stringify({ message: "Password reset successful" }),
        {
            status: 200
        }
    )
}
