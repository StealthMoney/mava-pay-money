"use server"

import { AccountRepository } from "@/services/prisma/repository"
import { auth } from "@/utils/auth-token"
import { decodeJwt } from "jose"
import { prisma } from "@/lib/prisma"

export const getProfile = async () => {
    const session = await auth()
    if (!session) {
        return {
            error: "unauthorized",
            data: null
        }
    }
    const token = session.accessToken
    if (!token) {
        return {
            error: "unauthorized",
            data: null
        }
    }
    const decodedToken = decodeJwt(token)
    const userEmail =
        (decodedToken.email as string) ?? (session.user.email as string)

    const profile =
        await AccountRepository(prisma).getAccountByUserEmail(userEmail)
    if (profile instanceof Error) {
        return {
            error: "unable to fetch profile data",
            data: null
        }
    }

    return {
        error: null,
        data: profile
    }
}
