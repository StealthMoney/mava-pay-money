"use server"

import { prisma } from "@/lib/prisma"
import { AccountRepository } from "@/services/prisma/repository"
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
        const result = await prisma.$transaction(async (prisma) => {
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
                    bvn: accountDetails.bvn
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
