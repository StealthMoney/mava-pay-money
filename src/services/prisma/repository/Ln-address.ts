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

export const LnAddressRepository = (prisma: Prisma) => {
    const create = async (
        lnAddressData: Prisma.LnAddressCreateInput & { userEmail: string }
    ) => {
        try {
            const { userEmail, ...lnAddress } = lnAddressData
            const newLnAddress = await prisma.lnAddress.create({
                data: {
                    ...lnAddress,
                    user: {
                        connect: { email: userEmail }
                    }
                }
            })
            if (!newLnAddress) {
                return new RepositoryError("Could not create lnAddress")
            }

            return newLnAddress
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "PrismaClientKnownRequestError":
                    return new RepositoryError("LnAddress already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updateLnAddress = async ({
        lnAddress,
        userEmail
    }: {
        lnAddress: Prisma.LnAddressUpdateInput
        userEmail: string
    }) => {
        try {
            const updatedLnAddress = await prisma.lnAddress.update({
                where: { userEmail },
                data: lnAddress
            })
            if (!updatedLnAddress.id) {
                return new RepositoryError("Could not update lnAddress")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getLnAddressByUserEmail = async (userEmail: string) => {
        try {
            const lnAddress = await prisma.lnAddress.findUnique({
                where: { userEmail }
            })
            if (!lnAddress) {
                return new RepositoryError("LnAddress not found")
            }
            return lnAddress
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getLnAddressByUsername = async (address: string) => {
        try {
            const lnAddress = await prisma.lnAddress.findFirst({
                where: { address }
            })
            if (!lnAddress) {
                return new RepositoryError("LnAddress not found")
            }
            return lnAddress
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        updateLnAddress,
        getLnAddressByUserEmail,
        getLnAddressByUsername
    }
}
