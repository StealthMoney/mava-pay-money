"use server"

import { prisma } from "@/lib/prisma"
import { AccountRepository } from "@/services/prisma/repository"
import { ExternalKeysRepository } from "@/services/prisma/repository/external-keys"
import { KYCRepository } from "@/services/prisma/repository/kyc"
import { auth } from "@/utils/auth-token"

import { AccountDetails } from "./page"

export const updateAccount = async (accountDetails: AccountDetails) => {
    const session = await auth()
    if (!session) {
        return {
            success: false,
            message: "Unauthorized"
        }
    }
    const userEmail = session.user?.email
    try {
        await prisma.$transaction(async (prisma) => {
            const accountToUpdate = await AccountRepository(
                prisma
            ).getAccountByUserEmail(userEmail!)
            if (accountToUpdate instanceof Error) {
                throw new Error(accountToUpdate.message)
            }
            const updateAccount = await AccountRepository(prisma).updateAccount(
                {
                    account: {
                        accountNumber: accountDetails.accountNumber,
                        accountName: accountDetails.accountName,
                        bankCode: accountDetails.bankCode,
                        lnAddress: ""
                    },
                    userEmail: userEmail!
                }
            )
            if (updateAccount instanceof Error) {
                throw new Error(updateAccount.message)
            }
            const updateKyc = await KYCRepository(prisma).updateKYC({
                kyc: {
                    bvn: accountDetails.bvn,
                    gender: accountDetails.gender
                },
                userEmail: userEmail!
            })
            if (updateKyc instanceof Error) {
                throw new Error(updateKyc.message)
            }
            return true
        })

        return {
            success: true,
            message: "Account details updated successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            message: `${error?.response?.data?.message || "An error occurred"}`
        }
    }
}

export const getAccountDetails = async (): Promise<AccountDetails | null> => {
    const session = await auth()
    if (!session) {
        return null
    }
    const userEmail = session.user?.email
    if (!userEmail) {
        return null
    }
    const account =
        await AccountRepository(prisma).getAccountByUserEmail(userEmail)
    if (account instanceof Error) {
        return null
    }
    const kyc = await KYCRepository(prisma).getKYCByUserEmail(userEmail)
    if (kyc instanceof Error) {
        return null
    }
    return {
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        bankCode: account.bankCode,
        bvn: kyc.bvn,
        email: userEmail,
        gender: kyc.gender
    }
}

export const getExternalKeys = async (name: string) => {
    const key = await ExternalKeysRepository(prisma).getKeyByName(name)
    if (key instanceof Error) {
        return null
    }
    return key
}

export const saveIdentityRef = async ({
    ref,
    email
}: {
    ref: string
    email: string
}) => {
    const updateRef = await KYCRepository(prisma).updateKYC({
        kyc: {
            identityRef: ref
        },
        userEmail: email
    })
    if (updateRef instanceof Error) {
        return {
            success: false,
            message: updateRef.message
        }
    }
    return {
        success: true,
        message: "Identity ref saved successfully"
    }
}
