"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

import { AccountDetails } from "@/app/kyc/page"
import { BankCode } from "@/types/bank"
import { Gender } from "@prisma/client"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import { CustomButton } from "../custom-button/CustomButton"
import { CustomInput } from "../custom-input/CustomInput"

export interface KycStepOneProps {
    onClickContinue: () => void
    setAccountDetails: React.Dispatch<React.SetStateAction<AccountDetails>>
    bankCodes: BankCode[]
    accountDetails: AccountDetails
    error: {
        error: boolean
        message: string
        type: string
    }
    loading: {
        bank: boolean
        accountUpdate: boolean
    }
}

export const KycStepOne = ({
    onClickContinue,
    bankCodes,
    error,
    loading,
    accountDetails,
    setAccountDetails
}: KycStepOneProps) => {
    return (
        <>
            <div className="w-full">
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <section className="flex h-2 gap-2 items-center justify-between w-full pb-5">
                        <div className=" h-2 bg-primary-green w-full rounded-[40px]"></div>
                        <div className="h-2 bg-tertiary-green w-full rounded-[40px]"></div>
                    </section>
                    <h2 className="text-black text-[28px] leading-[42px] font-rebond font-bold">
                        Complete your KYC <span>(1/2)</span>
                    </h2>
                    <p className=" hidden md:block font-inter-v text-secondary-black tracking-[-0.5px]">
                        Please enter all details correctly
                    </p>
                    <p className=" block md:hidden font-inter-v text-secondary-black tracking-[-0.5px]">
                        Please complete your KYC to get your special banking
                        address.{" "}
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full">
                    <p className="text-black font-rebond font-medium text-[14px]">
                        Gender{" "}
                        <span className="text-secondary-red text-[14px] font-rebond font-medium">
                            {error.type === "gender"
                                ? `(${error.message})`
                                : ""}
                        </span>
                    </p>
                    <select
                        name="gender"
                        onChange={(e) =>
                            setAccountDetails((prev: any) => ({
                                ...prev,
                                gender: e.target.value as Gender
                            }))
                        }
                        className="border-[1.5px] bg-secondary-gray text-base rounded-md w-full placeholder:font-rebond font-rebond font-light placeholder:font-light py-[18px] md:py-5 px-4 text-tertiary-gray"
                    >
                        <option value="">Select</option>
                        <option value="MALE" className="font-medium">
                            MALE
                        </option>
                        <option value="FEMALE" className="font-medium">
                            FEMALE
                        </option>
                    </select>
                    <p className=" text-black font-rebond font-medium text-[14px]">
                        Bank Details
                        {bankCodes && bankCodes?.length > 0 && (
                            <span className=" text-tertiary-gray text-[12px] font-light">
                                {" "}
                                (Select your bank)
                            </span>
                        )}
                    </p>
                    <select
                        name="bank-details"
                        onChange={(e) =>
                            setAccountDetails((prev: any) => ({
                                ...prev,
                                bankCode: e.target.value
                            }))
                        }
                        className=" border-[1.5px] bg-secondary-gray text-base rounded-md w-full placeholder:font-rebond font-rebond font-light placeholder:font-light py-[18px] md:py-5 px-4 text-tertiary-gray"
                    >
                        <option value="">Bank Name</option>
                        {bankCodes?.length &&
                            bankCodes?.map((bank: any, idx) => (
                                <option
                                    key={`${bank.nipBankCode}-${idx}`}
                                    value={bank.nipBankCode}
                                    className="font-medium"
                                >
                                    {bank.bankName}
                                </option>
                            ))}
                    </select>
                    {
                        <p
                            className={`${error.error && error.type === "bank" ? "text-secondary-red" : "text-secondary-gray"} ${error.type !== "bank" && !accountDetails.accountName && "hidden"} text-[12px] font-rebond font-medium`}
                        >
                            {error.type === "bank"
                                ? error.message
                                : accountDetails.accountName
                                  ? accountDetails.accountName
                                  : ""}
                        </p>
                    }
                    <CustomInput
                        inputProps={{
                            placeholder: "Account Number",
                            name: "accountNumber",
                            type: "number",
                            style: { color: "black" },
                            disabled:
                                String(accountDetails.accountNumber).length ===
                                    11 && loading.bank,
                            onChange: (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setAccountDetails((prev: any) => ({
                                    ...prev,
                                    accountNumber: e.target.value
                                }))
                        }}
                        // loading spinner as rightIcon
                        // TODO: make the loading spinner a reusable component
                        rightIcon={
                            loading.bank && (
                                <div className="m-auto border-[3px] border-[#ffffff] rounded-[50%] border-t-3 border-t-[#2EAE4E] max-w-[24px] max-h-[24px] w-[24px] h-[24px] animate-spin"></div>
                            )
                        }
                        className="border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                    {
                        <p
                            className={`${error ? "text-secondary-red" : "text-secondary-gray"} ${error.type !== "bvn" && "hidden"} text-[12px] font-rebond font-medium`}
                        >
                            {error.type === "bvn" && error.message}
                        </p>
                    }
                    <CustomInput
                        inputProps={{
                            placeholder: "BVN",
                            name: "bvn",
                            type: "number",
                            style: { color: "black" },
                            disabled: loading.bank,
                            onChange: (
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                if (loading.bank) return
                                setAccountDetails((prev: any) => ({
                                    ...prev,
                                    bvn: e.target.value
                                }))
                            }
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                </div>
                <section className=" md:pt-5 pt-6">
                    <h2 className=" text-primary-green font-rebond font-semibold">
                        Please Note:
                    </h2>
                    <p className=" text-sm leading-[21px] tracking-[-0.5px] text-black font-inter-v md:pt-1 pt-[15px]">
                        1. Please understand we need your BVN to confirm your
                        bank account and nothing more. Your BVN shall not be
                        made public.
                    </p>
                    <p className=" text-sm leading-[21px] tracking-[-0.5px] text-black font-inter-v md:pt-1 pt-[15px]">
                        2. Your bank account details are required to enable you
                        to receive funds and it must match your BVN details.
                        Hence, it is important to provide accurate details.
                    </p>
                </section>
            </div>

            <div className="w-full flex flex-col gap-16 pt-16">
                <div className=" w-full">
                    <CustomButton
                        label="Continue"
                        disabled={loading.bank || loading.accountUpdate}
                        loading={loading.accountUpdate}
                        type="primary"
                        rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                        className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                        buttonProps={{
                            onClick: onClickContinue
                        }}
                    />

                    <p className=" text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                        <span>
                            <Link
                                href="/profile"
                                className=" text-primary-green"
                            >
                                Go back to profile{" "}
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}
