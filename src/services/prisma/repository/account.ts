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

export const AccountRepository = (prisma: Prisma) => {
    const create = async (
        accountData: Prisma.AccountCreateInput & { userEmail: string }
    ) => {
        try {
            const { userEmail, ...account } = accountData
            const newAccount = await prisma.account.create({
                data: {
                    ...account,
                    user: {
                        connect: { email: userEmail }
                    }
                }
            })
            if (!newAccount) {
                return new RepositoryError("Could not create account")
            }

            return newAccount
        } catch (error) {
            console.log({ error })
            const err = error as unknown as Error
            switch (err.name) {
                case "PrismaClientKnownRequestError":
                    return new RepositoryError("Account already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updateAccount = async ({
        account,
        userEmail
    }: {
        account: Prisma.AccountUpdateInput
        userEmail: string
    }) => {
        try {
            const updatedAccount = await prisma.account.update({
                where: { userEmail },
                data: account
            })
            if (!updatedAccount.id) {
                return new RepositoryError("Could not update account")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getAccountById = async (accountId: number) => {
        try {
            const account = await prisma.account.findUnique({
                where: {
                    id: accountId
                }
            })
            if (!account) {
                return new RepositoryError("Account not found")
            }
            return account
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }
    const getAccountByUserEmail = async (email: string) => {
        try {
            const account = await prisma.account.findUnique({
                where: {
                    userEmail: email
                },
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            kycInfo: {
                                select: {
                                    status: true,
                                    bvn: true
                                }
                            },
                            lnAddress: {
                                select: {
                                    address: true
                                }
                            }
                        }
                    }
                }
            })
            if (!account) {
                return new RepositoryError("Account not found")
            }
            return account
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        updateAccount,
        getAccountById,
        getAccountByUserEmail
    }
}
