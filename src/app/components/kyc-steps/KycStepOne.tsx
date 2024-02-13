import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import { CustomInput } from "../custom-input/CustomInput"
import { CustomButton } from "../custom-button/CustomButton"

export interface KycStepOneProps {
    onClickContinue: () => void
}

export const KycStepOne = ({ onClickContinue }: KycStepOneProps) => {
    return (
        <>
            <div className=" w-full">
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

                <div className=" flex flex-col gap-6 w-full">
                    <select
                        name=""
                        id=""
                        className=" border-[1.5px] bg-secondary-gray text-base rounded-md w-full placeholder:font-rebond font-rebond font-light placeholder:font-light py-[18px]  md:py-5 px-4 text-tertiary-gray "
                    >
                        <option value="">Bank Name</option>
                        <option value="">Access</option>
                        <option value="">UBA</option>
                        <option value="">GTB</option>
                        <option value="">Kuda</option>
                    </select>
                    <CustomInput
                        inputProps={{
                            placeholder: "Account Number",
                            name: "accountNumber",
                            type: "number",
                            style: { color: "black" }
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                    <CustomInput
                        inputProps={{
                            placeholder: "BVN",
                            name: "bvn",
                            type: "number",
                            style: { color: "black" }
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                </div>
                <section className=" md:pt-5 pt-6">
                    <h2 className=" text-primary-green font-rebond font-semibold">
                        Please Note:
                    </h2>
                    <p className=" text-sm leading-[21px] tracking-[-0.5px] text-black font-inter-v md:pt-1 pt-[15px]">
                        Please understand we need your BVN to confirm your bank
                        account and nothing more. Your BVN shall not be made
                        public.
                    </p>
                </section>
            </div>

            <div className="w-full flex flex-col gap-16 pt-16">
                <div className=" w-full">
                    <CustomButton
                        label="Continue"
                        loading={false}
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
