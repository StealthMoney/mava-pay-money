import {
    getAccountDetails,
    getExternalKeys,
    saveIdentityRef
} from "@/app/kyc/update-account"
import { generateUserRef } from "@/utils"
import { KYCStatus } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"
import { useState } from "react"
import useIdentityPayKYC from "react-identity-kyc"

interface IdentityConfig {
    first_name: string
    last_name: string
    email: string
    merchant_key?: string
    user_ref?: string
    is_test?: boolean
    config_id?: string
    callback?: (response: any) => void
}

export const useIdentityVerify = () => {
    const { data: session, status, update } = useSession()
    const [config, setConfig] = useState<IdentityConfig | null>({
        first_name: "",
        last_name: "",
        email: ""
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const verifyUserIdentity = useIdentityPayKYC(config)
    const isTest =
        process.env.NODE_ENV === "development" ||
        process.env.VERCEL_ENV === "preview" ||
        process.env.VERCEL_ENV === "development"

    if (status !== "authenticated") {
        signOut()
    }

    const verifyIdentity = async () => {
        setError("")
        const userParams = await getAccountDetails()
        if (!userParams || !userParams.accountName || !userParams.email) {
            setError("Config is required")
            return
        }
        const merchantKey = await getExternalKeys("IDENTITY_PASS_PUBLIC_KEY")
        const widgetId = await getExternalKeys("IDENTITY_WIDGET_ID")
        if (!merchantKey || !widgetId) {
            setError("Config is required")
            return
        }
        const first_name = userParams.accountName?.split(" ")[0]
        const last_name = userParams.accountName?.split(" ")[1]
        const email = userParams.email
        const user_ref = generateUserRef(first_name)

        const config: IdentityConfig = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            merchant_key: merchantKey.key,
            user_ref: user_ref,
            is_test: isTest,
            config_id: widgetId.key,
            callback: (response) => {
                const saveRefResponse = saveIdentityRef({
                    ref: user_ref,
                    email
                })
                if (saveRefResponse instanceof Error) {
                    setError("KYC verification failed")
                    console.log("KYC verification failed")
                    console.log(saveRefResponse)
                    return
                }
                if (
                    (response && response?.status === "success") ||
                    response?.code === "00"
                ) {
                    setSuccess(true)
                    console.log("KYC verification successful")
                } else {
                    setError("KYC verification failed")
                    console.log("KYC verification failed")
                }
                // update the kyc status to pending
                // update({ kycStatus: KYCStatus.PENDING })
                //     .then((data) => {
                //         console.log("KYC status updated")
                //         console.log({ data })
                //     })
                //     .catch((error) => {
                //         console.log("Error updating KYC status")
                //         console.log({ error })
                //     })
                return response
            }
        }
        setConfig(config)
        setLoading(true)
        await verifyUserIdentity()
        setLoading(false)
    }

    return { verifyIdentity, loading, error, ref: config?.user_ref, success }
}
