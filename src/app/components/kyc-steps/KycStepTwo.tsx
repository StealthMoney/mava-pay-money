import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import SelfieIcon from "../../assets/svgs/selfie-icon.svg"
import { CustomButton } from "../custom-button/CustomButton"

export const KycStepTwo = () => {
    return (
        <>
            <div className="flex items-start flex-col gap-1 w-full pb-8">
                <section className="flex h-2 gap-2 items-center justify-between w-full pb-5">
                    <div className=" h-2 bg-primary-green w-full rounded-[40px]"></div>
                    <div className="h-2 bg-primary-green w-full rounded-[40px]"></div>
                </section>
                <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                    Complete your KYC <span>(2/2)</span>
                </h2>
                <p className="font-inter-v text-secondary-black tracking-[-0.5px]">
                    Take your liveness test to complete the KYC registration.{" "}
                </p>
            </div>

            <div className=" flex flex-col items-center gap-6 w-full">
                <Image src={SelfieIcon} alt="kyc selfie icon" />
            </div>

            <div className="w-full flex flex-col gap-16 pt-16">
                <div className=" w-full">
                    <CustomButton
                        label="Continue"
                        loading={false}
                        type="primary"
                        rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                        className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
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
