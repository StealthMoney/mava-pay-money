import { type NextRequest } from "next/server"
import {
    validateAmount,
    validateFees,
    validateLNAddress
} from "@/domain/lnAddress/validation"
import { MAVAPAY_MONEY_DOMAIN } from "@/config/process"
import { acceptQuote, getQuote } from "@/services/mavapay"
import { milliSatsToSats } from "@/utils/conversion"
import { prisma } from "@/lib/prisma"
import { AccountRepository, UserRepository } from "@/services/prisma/repository"
import { buildResponse } from "@/domain/lnAddress/constructor"
import { Quote } from "@/types/quote"
import { Order } from "@/types/order"
import { MAX_SPENDABLE, MIN_SPENDABLE, PARTNER_QUERY } from "@/config/default"
import { PartnerRepository } from "@/services/prisma/repository/partner"
import { Partner } from "@prisma/client"
import { validateAuthHeader } from "@/services/auth/token"

export async function GET(request: NextRequest, context: { params: any }) {
    const reqUsername = context.params?.username
    const username = reqUsername?.toLowerCase()
    const searchParams = request.nextUrl.searchParams
    const amount = searchParams.get("amount")
    const fees = searchParams.get("fees")
    const callback = searchParams.get("callback")

    let partner = ""
    let partnerData = {} as Partner

    const validatedPartner = await validateAuthHeader(request)

    if (validatedPartner instanceof Error) {
        console.error(validatedPartner.message)
        return new Response(stringifyError(validatedPartner), {
            status: validatedPartner.status
        })
    }

    if (validatedPartner.isValid) {
        if (validatedPartner.partner) {
            searchParams.set(PARTNER_QUERY, validatedPartner.partner)
            partner = validatedPartner.partner
        } else {
            searchParams.delete(PARTNER_QUERY)
        }
        request.nextUrl.search = searchParams.toString()
    } else {
        return new Response("Unknown Authorization Error", {
            status: 401
        })
    }

    if (partner) {
        const validatedPartner =
            await PartnerRepository().getPartnerByName(partner)
        if (validatedPartner instanceof Error) {
            return new Response(stringifyError(validatedPartner), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        partnerData = validatedPartner
    }

    const validatedAmount = validateAmount(amount)

    if (validatedAmount instanceof Error) {
        console.error(validatedAmount.message)
        return new Response(stringifyError(validatedAmount), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const sats = milliSatsToSats(validatedAmount)

    if (sats instanceof Error) {
        console.error(sats.message)
        return new Response(stringifyError(sats), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const lnAddress = username
    const validateAddress = validateLNAddress(lnAddress)
    if (validateAddress instanceof Error) {
        console.error(validateAddress.message)
        return new Response(stringifyError(validateAddress), {
            status: 500,
            statusText: validateAddress?.message
        })
    }

    const user = await UserRepository(prisma).getUserBylnAddress(
        `${lnAddress}@${MAVAPAY_MONEY_DOMAIN}`
    )

    if (user instanceof Error) {
        console.error(user.message)
        return new Response(stringifyError(user), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const account = await AccountRepository(prisma).getAccountByUserId(user.id)

    if (account instanceof Error) {
        return new Response(stringifyError(account), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    try {
        const validatedFees = validateFees(fees)

        if (validatedFees instanceof Error) {
            return new Response(stringifyError(validatedFees), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        const quote = await getQuote({ amount: sats })

        if (!quote.success || !quote.data) {
            console.error(quote.message)
            return new Response(stringifyError(quote, quote.message), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        console.log("quote", quote.data)

        const quoteId = quote.data.id

        const metadataString = buildResponse("", username).metadata

        const order = await acceptQuote({
            id: quoteId,
            bankAccountName: account.accountName,
            bankAccountNumber: account.accountNumber,
            bankCode: account.bankCode.toString(),
            descriptionHash: metadataString,
            customerInternalFee: validatedFees,
            partner: partnerData.name
        })

        if (!order.success || !order.data) {
            console.error(order.message)
            return new Response(stringifyError(order, order.message), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        console.log("order", order.data)

        const newOrder = await prisma.order.create({
            data: {
                accountId: account.id,
                orderId: order.data.orderId,
                quoteId: order.data.quote!.id,
                paymentMethod: "LIGHTNING",
                amount: Number(quote.data.amountInSourceCurrency),
                targetAmount: quote.data.amountInTargetCurrency,
                status: "PENDING",
                isValid: order.data.isValid,
                invoice: order.data.paymentBtcDetail,
                createdAt: order.data.createdAt,
                expiryTime: quote.data.expiry,
                partnerId: partnerData.id,
                callback: callback
            }
        })
        console.log({ newOrder })

        const lnResponse = buildLnResponse(order.data)
        return new Response(JSON.stringify(lnResponse), {
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
            }
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

const buildLnResponse = (order: Order) => {
    const { paymentBtcDetail, quote } = order
    return {
        routes: [],
        pr: paymentBtcDetail,
        metadata: { ...quote },
        minSpendable: MIN_SPENDABLE,
        maxSpendable: MAX_SPENDABLE
    }
}
