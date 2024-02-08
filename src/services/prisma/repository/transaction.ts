import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import {
    RepositoryError,
    UnknownRepositoryError,
    parseErrorMessageFromUnknown
} from "@/domain/error"
import { Logger } from "@/config/logger"

export const TransactionRepository = () => {
    const create = async (transaction: Prisma.TransactionCreateInput) => {
        try {
            const newTransaction = await prisma.transaction.create({
                data: transaction
            })
            if (!newTransaction) {
                return new RepositoryError("Could not create transaction")
            }

            return newTransaction
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "SequelizeUniqueConstraintError":
                    return new RepositoryError("Transaction already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updateTransaction = async ({
        transaction,
        transactionId
    }: {
        transaction: Prisma.TransactionUpdateInput
        transactionId: number
    }) => {
        try {
            const updatedTransaction = await prisma.transaction.update({
                where: { id: transactionId },
                data: transaction
            })
            if (!updatedTransaction.id) {
                return new RepositoryError("Could not update transaction")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getTransactionById = async (transactionId: number) => {
        try {
            const transaction = await prisma.transaction.findUnique({
                where: {
                    id: transactionId
                }
            })
            if (!transaction) {
                return new RepositoryError("Transaction not found")
            }
            return transaction
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getTransactionsByOrderId = async (orderId: string) => {
        try {
            const transaction = await prisma.transaction.findMany({
                where: {
                    orderId: orderId
                }
            })
            if (!transaction) {
                return new RepositoryError("Transaction not found")
            }
            return transaction
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        updateTransaction,
        getTransactionById,
        getTransactionsByOrderId
    }
}
