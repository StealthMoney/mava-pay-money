import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../assets/svgs/arrow.svg"
import PasswordInput from "../components/password-input"
import { CustomInput } from "../components/custom-input/CustomInput"
import { CustomButton } from "../components/custom-button/CustomButton"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import { MailCheck } from "../components/mail-check/MailCheck"

const page = () => {
    return (
        <PageSkeleton
            navbarRouteName={"Sign Up"}
            navbarHref={"/sign-up"}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <div className=" w-full">
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-secondary-black text-[28px] leading-[42px] font-bold font-rebond">
                        Sign In
                    </h2>
                    <p className="font-inter-v text-secondary-black pt-1 tracking-[-0.5px]">
                        Enter you email and password to sign into your account
                    </p>
                </div>
                <div className="flex flex-col gap-6 md:pb-16 w-full">
                    <CustomInput
                        inputProps={{
                            placeholder: "Email address",
                            name: "email",
                            type: "email",
                            style: { color: "black" }
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                    <PasswordInput placeholder="Password" />
                </div>
                <p className="block md:hidden text-secondary-black text-center pt-6 text-sm">
                    Forgot your password?{" "}
                    <span>
                        <Link
                            href="/forgot-password"
                            className=" underline text-primary-green"
                        >
                            Reset here
                        </Link>
                    </span>
                </p>
            </div>

            <div className="w-full">
                <CustomButton
                    label="Sign In"
                    loading={false}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                    className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                />
                <p className="hidden md:block text-secondary-black text-center pt-6 text-sm">
                    Forgot your password?{" "}
                    <span>
                        <Link
                            href="/forgot-password"
                            className=" underline text-primary-green"
                        >
                            Reset here
                        </Link>
                    </span>
                </p>
            </div>
        </PageSkeleton>
    )
}

export default page
