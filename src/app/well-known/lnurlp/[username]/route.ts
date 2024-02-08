import { type NextRequest } from "next/server"
import { validateLNAddress } from "@/domain/lnAddress/validation"
import { UserRepository } from "@/services/prisma/repository/user"
import { buildResponse } from "@/domain/lnAddress/constructor"
import { API_DOMAIN, MAVAPAY_MONEY_DOMAIN, isProd } from "@/config/process"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, context: { params: any }) {
    const lnAddress = context.params?.username?.toLowerCase()
    const validateAddress = validateLNAddress(lnAddress)
    if (validateAddress instanceof Error) {
        return new Response(stringifyError(validateAddress), {
            status: 500,
            statusText: validateAddress?.message
        })
    }

    try {
        const user = await UserRepository(prisma).getUserBylnAddress(
            `${lnAddress}@${MAVAPAY_MONEY_DOMAIN}`
        )

        if (user instanceof Error) {
            return new Response(stringifyError(user), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        const hostname = isProd ? MAVAPAY_MONEY_DOMAIN : API_DOMAIN

        const responseJson = buildResponse(
            hostname,
            validateAddress.addressName
        )

        return new Response(JSON.stringify(responseJson), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (err: any) {
        const errorMessage = "Internal Server Error"
        return new Response(stringifyError(err, errorMessage), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            statusText: err?.message ?? "Error getting address"
        })
    }
}

const stringifyError = (
    err: any,
    customMessage: string = "Something went wrong"
) => {
    let errMessage
    if (err instanceof Error) errMessage = err.message
    else errMessage = customMessage
    return JSON.stringify({
        status: "Error",
        reason: errMessage
    })
}
