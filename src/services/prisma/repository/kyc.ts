import { Logger } from "@/config/logger"
import {
    parseErrorMessageFromUnknown,
    RepositoryError,
    UnknownRepositoryError
} from "@/domain/error"
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

type Prisma = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>

export const KYCRepository = (prisma: Prisma) => {
    const create = async (
        kycData: Prisma.KYCInfoCreateInput & { userId: number }
    ) => {
        try {
            const { userId, ...kyc } = kycData
            const newKYC = await prisma.kYCInfo.create({
                data: {
                    ...kyc,
                    user: {
                        connect: { id: userId }
                    }
                }
            })
            if (!newKYC) {
                return new RepositoryError("Could not create KYC")
            }

            return newKYC
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "PrismaClientKnownRequestError":
                    return new RepositoryError("KYC Info already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updateKYC = async ({
        kyc,
        userId
    }: {
        kyc: Prisma.KYCInfoUpdateInput
        userId: number
    }) => {
        try {
            const updatedKYC = await prisma.kYCInfo.update({
                where: { userId: userId },
                data: kyc
            })
            if (!updatedKYC.id) {
                return new RepositoryError("Could not update KYC")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getKYCById = async (id: number) => {
        try {
            const kyc = await prisma.kYCInfo.findUnique({
                where: {
                    id
                }
            })
            if (!kyc) {
                return new RepositoryError("KYC not found")
            }
            return kyc
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }
    const getKYCByUserId = async (userId: number) => {
        try {
            const kyc = await prisma.kYCInfo.findUnique({
                where: {
                    userId: userId
                }
            })
            if (!kyc) {
                return new RepositoryError("KYC not found")
            }
            return kyc
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        getKYCById,
        getKYCByUserId,
        updateKYC
    }
}
