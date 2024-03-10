"use server"

import axiosInstance from "../rest/axios"

export const getBankCode = async () => {
    try {
        const res = await axiosInstance.get("bank/bankcode")
        if (res.status !== 200) {
            throw new Error("An error occurred")
        }
        return { success: true, data: res.data.data }
    } catch (error: any) {
        console.log(error.response)
        return {
            success: false,
            message: `${error?.response?.data?.message || "An error occurred"}`
        }
    }
}

export const getAccountName = async (
    accountNumber: string,
    bankCode: string
) => {
    try {
        const res = await axiosInstance.get(
            `bank/name-enquiry?accountNumber=${accountNumber}&bankCode=${bankCode}`
        )
        console.log(res.data.data)
        return { success: true, data: res.data.data }
    } catch (error: any) {
        console.log(error.response)
        return {
            success: false,
            message: `${error?.response?.data?.message || "An error occurred"}`
        }
    }
}
