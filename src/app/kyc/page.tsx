"use client"

import React, { useCallback, useState } from "react"

import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import { KycStepOne } from "../components/kyc-steps/KycStepOne"
import { KycStepTwo } from "../components/kyc-steps/KycStepTwo"
import { signOut } from "next-auth/react"
import { getAccountName, getBankCode } from "@/services/mavapay/bank"
import { ACCOUNT_NUMBER_LENGTH, BVN_LENGTH } from "@/config/default"
import { updateAccount } from "./update-account"

export interface BankCode {
    nipBankCode: string
    bankName: string
}

export interface AccountDetails {
    accountNumber: string
    accountName?: string
    bankCode: string
    bvn: string
}

const Page = () => {
    const [step, setStep] = useState({ first: true, second: false })
    const [loading, setLoading] = useState({
        bank: false,
        accountUpdate: false
    })
    const [lastVerifiedAccountNumber, setLastVerifiedAccountNumber] =
        useState("")
    const [stepOneError, setStepOneError] = useState({
        error: false,
        message: "",
        type: ""
    })
    const [bankCodes, setBankCodes] = React.useState<BankCode[]>([])
    const [accountDetails, setAccountDetails] = React.useState<AccountDetails>({
        accountNumber: "",
        accountName: "",
        bankCode: "",
        bvn: ""
    })

    const verifyAccount = useCallback(
        async (data: AccountDetails) => {
            const { accountNumber, bankCode } = data
            if (
                accountNumber === lastVerifiedAccountNumber ||
                !bankCode ||
                !accountNumber
            ) {
                return
            }
            setStepOneError({
                error: false,
                message: "",
                type: ""
            })
            setLoading((prev) => ({
                ...prev,
                bank: true
            }))
            const res = await getAccountName(accountNumber, bankCode)
            setLoading((prev) => ({
                ...prev,
                bank: false
            }))
            if (res.success) {
                setAccountDetails((prev) => ({
                    ...prev,
                    accountName: res.data.accountName
                }))
                setLastVerifiedAccountNumber((prevNumber) => {
                    return prevNumber !== accountNumber
                        ? accountNumber
                        : prevNumber
                })
            } else {
                setStepOneError({
                    error: true,
                    message: res.message || "An error occurred",
                    type: "bank"
                })
                setLastVerifiedAccountNumber("")
                return
            }
        },
        [lastVerifiedAccountNumber]
    )

    const goToStepTwo = async () => {
        if (!accountDetails.accountName || !accountDetails.bankCode) {
            setStepOneError({
                error: true,
                message: "Please enter your valid account number",
                type: "bank"
            })
            return
        }
        if (!accountDetails.bvn || accountDetails.bvn.length !== BVN_LENGTH) {
            setStepOneError({
                error: true,
                message: "Please enter your valid BVN",
                type: "bvn"
            })
            return
        }
        setLoading((prev) => ({
            ...prev,
            accountUpdate: true
        }))
        const result = await updateAccount(accountDetails)
        console.log({ result })
        setLoading((prev) => ({
            ...prev,
            accountUpdate: false
        }))
        if (result.success) {
            setStep((prev) => ({
                ...prev,
                first: false,
                second: true
            }))
        } else {
            setStepOneError({
                error: true,
                message: "An error occurred! Please try again later.",
                type: "account-update"
            })
        }
    }

    React.useEffect(() => {
        if (accountDetails.bvn.length > BVN_LENGTH) {
            setStepOneError({
                error: true,
                message: `BVN must be ${BVN_LENGTH} digits`,
                type: "bvn"
            })
            return
        }
        setStepOneError({
            error: false,
            message: "",
            type: ""
        })
    }, [accountDetails.bvn])

    React.useEffect(() => {
        if (
            accountDetails.accountNumber.length &&
            accountDetails.accountNumber.length > ACCOUNT_NUMBER_LENGTH
        ) {
            setStepOneError({
                error: true,
                message: "Invalid account number",
                type: "bank"
            })
            setLastVerifiedAccountNumber("")
            return
        }
        if (
            accountDetails.bankCode &&
            accountDetails.accountNumber.length === ACCOUNT_NUMBER_LENGTH
        ) {
            verifyAccount(accountDetails)
        }
    }, [accountDetails, verifyAccount])

    React.useEffect(() => {
        const fetchBankCode = async () => {
            const res = await getBankCode()
            if (res.success) {
                setBankCodes(res.data as BankCode[])
            }
        }
        fetchBankCode()
    }, [])

    return (
        <PageSkeleton
            navbarRouteName={"Log Out"}
            navbarHref="#"
            onClick={() => signOut()}
            className=" h-screen justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            {!stepOneError.error && stepOneError.type !== "account-update" && (
                <div className="w-full text-center text-red-500">
                    <p>{stepOneError.message}</p>
                </div>
            )}
            {step.first && (
                <KycStepOne
                    onClickContinue={goToStepTwo}
                    bankCodes={bankCodes}
                    accountDetails={accountDetails}
                    setAccountDetails={setAccountDetails}
                    error={stepOneError}
                    loading={loading}
                />
            )}
            {step.second && <KycStepTwo />}
        </PageSkeleton>
    )
}

export default Page
