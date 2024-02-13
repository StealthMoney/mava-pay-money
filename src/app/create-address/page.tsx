"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../assets/svgs/arrow.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import { CustomInput } from "../components/custom-input/CustomInput"

const page = () => {
    return (
        <PageSkeleton
            navbarRouteName={"Log Out"}
            navbarHref="#"
            onClick={() => {}}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <div>
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                        Create Lightning bank address{" "}
                    </h2>
                    <p className="font-inter-v text-black pt-1 tracking-[-0.5px]">
                        Create a Lightning bank address which you can use to
                        receive BTC from any wallet that supports lightning in
                        your Naira bank account{" "}
                    </p>
                </div>
                <div className="flex flex-col gap-6 pb-16 w-full">
                    <CustomInput
                        inputProps={{
                            placeholder: "Username",
                            name: "email",
                            type: "email",
                            style: { color: "black" }
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                        rightIcon={
                            <p className=" font-rebond text-sm font-medium text-subtext-gray">
                                @mavapay.com
                            </p>
                        }
                    />

                    <section>
                        <h2 className=" text-primary-green font-rebond font-semibold">
                            Note:
                        </h2>
                        <p className=" text-sm text-subtext-gray font-inter-v pt-1">
                            Your username will appear in this format
                            ‘example@mavapay.com
                        </p>
                    </section>
                </div>
            </div>

            <div className="w-full">
                <CustomButton
                    label="Create address"
                    loading={false}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                    className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                />
                <p className=" text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                    <span>
                        <Link href="/profile" className=" text-primary-green">
                            Go back to profile{" "}
                        </Link>
                    </span>
                </p>
            </div>
        </PageSkeleton>
    )
}

export default page
