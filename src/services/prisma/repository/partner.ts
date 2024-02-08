import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import {
    RepositoryError,
    UnknownRepositoryError,
    parseErrorMessageFromUnknown
} from "@/domain/error"
import { Logger } from "@/config/logger"

export const PartnerRepository = () => {
    const create = async (partner: Prisma.PartnerCreateInput) => {
        try {
            const newPartner = await prisma.partner.create({ data: partner })
            if (!newPartner) {
                return new RepositoryError("Could not create partner")
            }

            return newPartner
        } catch (error) {
            const err = error as unknown as Error
            switch (err.name) {
                case "SequelizeUniqueConstraintError":
                    return new RepositoryError("Partner already exists")
                default:
                    break
            }
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const updatePartner = async ({
        partner,
        userId
    }: {
        partner: Prisma.PartnerUpdateInput
        userId: number
    }) => {
        try {
            const updatedPartner = await prisma.partner.update({
                where: { id: userId },
                data: partner
            })
            if (!updatedPartner.id) {
                return new RepositoryError("Could not update partner")
            }
            return true
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    const getPartnerById = async (accountId: number) => {
        try {
            const partner = await prisma.partner.findUnique({
                where: {
                    id: accountId
                }
            })
            if (!partner) {
                return new RepositoryError("Partner not found")
            }
            return partner
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }
    const getPartnerByName = async (name: string) => {
        try {
            const partner = await prisma.partner.findUnique({
                where: {
                    name
                }
            })
            if (!partner) {
                return new RepositoryError("Partner not found")
            }
            return partner
        } catch (error) {
            Logger.error(error)
            const errMsg = parseErrorMessageFromUnknown(error)
            return new UnknownRepositoryError(errMsg)
        }
    }

    return {
        create,
        updatePartner,
        getPartnerById,
        getPartnerByName
    }
}
