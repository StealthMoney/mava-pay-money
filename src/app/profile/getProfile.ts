"use server"

import { UnauthorizedError } from "@/server/error"
import { AccountRepository } from "@/services/prisma/repository"
import { auth } from "@/utils/auth-token"
import { decodeJwt } from "jose"
import { prisma } from "@/lib/prisma"
import { RepositoryError } from "@/domain/error"

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
    const userId = (decodedToken.id as string) ?? (session.user.id as string)

    const profile = await AccountRepository(prisma).getAccountByUserId(
        Number(userId)
    )
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
