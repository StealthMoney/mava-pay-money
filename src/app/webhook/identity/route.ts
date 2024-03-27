import { type NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { Logger } from "@/config/logger"
import { KYCStatus } from "@prisma/client"
import { KYCRepository } from "@/services/prisma/repository/kyc"
import { AccountRepository } from "@/services/prisma/repository"
import { IdentityWebhookPayload } from "@/types/webhook"

export async function POST(request: NextRequest) {
    const isTest =
        process.env.VERCEL_ENV === "preview" ||
        process.env.NODE_ENV === "development"
    const requestbody = (await request.json()) as IdentityWebhookPayload

    try {
        const userRef = requestbody.widget_info.user_ref
        const email = requestbody.widget_info.email

        if (requestbody.response_code === "00") {
            const bvn = requestbody.data?.bvn || 0
            const firstName = requestbody?.data?.firstName?.toLowerCase() || ""
            const lastName = requestbody?.data?.lastName?.toLowerCase() || ""
            const middleName =
                requestbody?.data?.middleName?.toLowerCase() || ""
            const gender = requestbody.data?.gender?.toLowerCase()

            const profile =
                await AccountRepository(prisma).getAccountByUserEmail(email)
            if (profile instanceof Error) {
                Logger.error("Error fetching profile")
                throw profile
            }

            const isGenderCorrect =
                profile.user.kycInfo?.gender.toLowerCase() === gender
            const isBvnCorrect =
                Number(profile.user.kycInfo?.bvn || 0) === Number(bvn)
            const isNameValid = profile.accountName
                ? [firstName, lastName, middleName].some((name) =>
                      profile.accountName.includes(name)
                  )
                : false

            const isKYCValid = isTest
                ? true
                : isGenderCorrect && isBvnCorrect && isNameValid
            console.log({ isGenderCorrect, isBvnCorrect, isNameValid })
            if (!isKYCValid) {
                Logger.error("KYC validation failed")
                const updatedKYC = await KYCRepository(prisma).updateKYC({
                    kyc: {
                        status: KYCStatus.REJECTED,
                        identityRef: userRef
                    },
                    userEmail: email
                })
                if (updatedKYC instanceof Error) {
                    Logger.error("Error updating KYC status")
                    throw updatedKYC
                }
                return
            }

            const updatedKYC = await KYCRepository(prisma).updateKYC({
                kyc: {
                    status: KYCStatus.APPROVED,
                    identityRef: userRef
                },
                userEmail: email
            })
            if (updatedKYC instanceof Error) {
                Logger.error("Error updating KYC status")
                throw updatedKYC
            }
            Logger.info("KYC validation successful")
        }
        if (requestbody.response_code === "01") {
            const error = requestbody.message
            const status = requestbody.status
            const updatedKYC = await KYCRepository(prisma).updateKYC({
                kyc: {
                    status: KYCStatus.REJECTED,
                    identityRef: userRef
                },
                userEmail: email
            })
            if (updatedKYC instanceof Error) {
                console.log("Error updating KYC status")
                throw updatedKYC
            }
            console.log({ error, status })
        }
    } catch (error) {
        Logger.error(error)
    } finally {
        return new Response("success", {
            status: 200
        })
    }
}
