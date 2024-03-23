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

export const ExternalKeysRepository = (prisma: Prisma) => {
    const create = async (data: Prisma.ExternalAccountKeysCreateInput) => {
        try {
            const newKey = await prisma.externalAccountKeys.create({
                data: {
                    ...data
                }
            })
            if (!newKey) {
                return new RepositoryError("Could not create Key")
            }

            return newKey
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "PrismaClientKnownRequestError":
                    return new RepositoryError("Key already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updateKey = async ({
        key,
        name
    }: {
        key: Prisma.ExternalAccountKeysUpdateInput
        name: string
    }) => {
        try {
            const updatedKey = await prisma.externalAccountKeys.update({
                where: {
                    name
                },
                data: key
            })
            if (!updatedKey.id) {
                return new RepositoryError("Could not update Key")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getKeyByName = async (name: string) => {
        try {
            const key = await prisma.externalAccountKeys.findUnique({
                where: {
                    name
                }
            })
            if (!key) {
                return new RepositoryError("Key not found")
            }
            return key
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        updateKey,
        getKeyByName
    }
}
