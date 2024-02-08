import { Quote, acceptQuoteProps } from "@/types/quote"
import axiosInstance from "../rest/axios"
import { Order } from "@/types/order"

export const getQuote = async ({ amount }: { amount: number }) => {
    const data = {
        amount,
        sourceCurrency: "BTC",
        targetCurrency: "NGN",
        paymentMethod: "LIGHTNING",
        paymentCurrency: "BTC",
        implicitFees: true
    }
    try {
        const res = await axiosInstance.post("quote", data)
        return { success: true, data: res.data.data as Quote["data"] }
    } catch (error: any) {
        console.error("err from getquote", error.response)
        return { success: false, message: error?.response?.data?.message }
    }
}

export const acceptQuote = async ({
    id,
    bankAccountNumber,
    bankAccountName,
    bankCode,
    descriptionHash,
    memo,
    customerInternalFee,
    partner
}: acceptQuoteProps) => {
    const params = new URLSearchParams()
    params.append("autopayout", "true")
    params.append("id", id)
    params.append("bankAccountNumber", bankAccountNumber)
    params.append("bankAccountName", bankAccountName)
    params.append("bankCode", bankCode)
    params.append("descriptionHash", descriptionHash)
    if (memo) {
        params.append("memo", memo)
    }
    if (customerInternalFee && partner) {
        params.append("customerInternalFee", customerInternalFee.toString())
    }

    const queryParams = params.toString()
    try {
        const res = await axiosInstance.get(`quote/accept?${queryParams}`)
        return { success: true, data: res.data.data as Order }
    } catch (error: any) {
        console.error("error from accept quote", error.response.data)
        return { success: false, message: error.response.data.message }
    }
}
