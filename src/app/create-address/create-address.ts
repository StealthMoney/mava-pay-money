"use server"

import { prisma } from "@/lib/prisma"
import { LnAddressRepository } from "@/services/prisma/repository/Ln-address"

export const createAddress = async (email: string, username: string) => {
    const usernameExists =
        await LnAddressRepository(prisma).getLnAddressByUsername(username)
    if (!(usernameExists instanceof Error)) {
        return {
            error: "Oops! Another user got this username before you did. Please choose another username",
            data: null
        }
    }
    const newUsername = await LnAddressRepository(prisma).create({
        address: username,
        userEmail: email
    })
    if (newUsername instanceof Error) {
        return {
            error: "unable to create username",
            data: null
        }
    }
    return {
        error: null,
        data: newUsername
    }
}
