import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../assets/svgs/arrow.svg"
import PasswordInput from "../components/password-input"
import { CustomButton } from "../components/custom-button/CustomButton"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"

const page = () => {
    return (
        <PageSkeleton
            navbarRouteName={"Sign Up"}
            navbarHref={"/sign-up"}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <div className=" w-full">
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                        Reset your password{" "}
                    </h2>
                    <p className="font-inter-v text-secondary-black pt-1 tracking-[-0.5px]">
                        Enter and confirm your new password
                    </p>
                </div>
                <div className="flex flex-col gap-6 md:pb-16 w-full">
                    <PasswordInput placeholder="New Password (min. of 8 characters)" />
                    <PasswordInput placeholder="Confirm New Password" />
                </div>
                <p className="md:hidden block text-secondary-black text-center pt-6 text-sm">
                    <span>
                        <Link href="/sign-in" className=" text-primary-green">
                            Return to Sign In{" "}
                        </Link>
                    </span>
                </p>
            </div>

            <div className="w-full">
                <CustomButton
                    label="Reset password"
                    loading={false}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                    className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                />
                <p className="hidden md:block text-secondary-black text-center pt-6 text-sm">
                    <span>
                        <Link href="/sign-in" className=" text-primary-green">
                            Return to Sign In{" "}
                        </Link>
                    </span>
                </p>
            </div>
        </PageSkeleton>
    )
}

export default page
