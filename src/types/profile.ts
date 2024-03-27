import { KYCStatus } from "@prisma/client"

export interface Profile {
    id: number
    lnAddress?: string
    accountNumber?: string
    bankCode?: string
    user: {
        email: string
        firstName: string
        lastName: string
        middleName: string
        kycInfo?: {
            id?: number
            status?: KYCStatus
            bvn?: string
        }
    }
}
