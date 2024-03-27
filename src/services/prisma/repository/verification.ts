import { Logger } from "@/config/logger"
import {
    RepositoryError,
    UnknownRepositoryError,
    parseErrorMessageFromUnknown
} from "@/domain/error"
import { Prisma, PrismaClient } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"

type Prisma = Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>

type VerificationType = Prisma.VerificationCreateInput

export const VerificationRepository = (prisma: Prisma) => {
    const create = async (
        verification: VerificationType & { userId: number }
    ) => {
        try {
            const { userId, ...verificationData } = verification
            const newVerification = await prisma.verification.create({
                data: {
                    ...verificationData,
                    userId: userId,
                    user: {
                        connect: { id: userId }
                    }
                }
            })

            if (!newVerification) {
                return new RepositoryError("Could not create verification")
            }

            return newVerification
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "PrismaClientKnownRequestError":
                    return new RepositoryError("Verification already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getVerificationByUserEmail = async (email: string) => {
        try {
            const verification = await prisma.verification.findUnique({
                where: { userEmail: email }
            })
            if (!verification) {
                return new RepositoryError("Could not find verification")
            }

            return verification
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const deleteVerificationByUserEmail = async (email: string) => {
        try {
            const verification = await prisma.verification.delete({
                where: { userEmail: email }
            })
            if (!verification) {
                return new RepositoryError("Could not delete verification")
            }

            return verification
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getVerificationByToken = async (token: string) => {
        try {
            const verification = await prisma.verification.findUnique({
                where: { token }
            })
            if (!verification) {
                return new RepositoryError("Could not find verification")
            }

            return verification
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        getVerificationByUserEmail,
        deleteVerificationByUserEmail,
        getVerificationByToken
    }
}
