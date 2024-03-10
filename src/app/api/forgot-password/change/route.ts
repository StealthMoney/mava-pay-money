import { decodeJwt } from "jose"

import { prisma } from "@/lib/prisma"
import { UserRepository } from "@/services/prisma/repository"
import { comparePassword, createPassword } from "@/utils/password"

export async function POST(req: Request) {
    const token = req.headers.get("x-auth-token")
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401
        })
    }

    const { oldPassword, newPassword } = await req.json()
    if (!oldPassword || !newPassword) {
        return new Response(
            JSON.stringify({
                error: "missing fields - oldPassword, newPassword"
            }),
            {
                status: 400
            }
        )
    }
    const decodedToken = decodeJwt(token)
    if (!decodedToken) {
        return new Response(JSON.stringify({ error: "invalid token" }), {
            status: 401
        })
    }
    if (decodedToken.type !== "access") {
        return new Response(JSON.stringify({ error: "invalid token" }), {
            status: 401
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: decodedToken.email as string
        }
    })
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 400
        })
    }

    const isMatch = await comparePassword(oldPassword as string, user.password)
    if (!isMatch) {
        return new Response(JSON.stringify({ error: "Invalid old password" }), {
            status: 400
        })
    }

    const hashedPassword = await createPassword(newPassword as string)
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
            JSON.stringify({ error: "Password change failed" }),
            {
                status: 500
            }
        )
    }
    return new Response(
        JSON.stringify({ message: "Password change successful" }),
        {
            status: 200
        }
    )
}
