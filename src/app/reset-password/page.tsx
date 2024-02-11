import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../assets/svgs/arrow.svg"
import PasswordInput from "../components/password-input"
import { CustomButton } from "../components/custom-button/CustomButton"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"

const page = () => {
    return (
        <PageSkeleton navbarRouteName={"Sign Up"} navbarHref={"/sign-up"}>
            <div className="bg-white flex h-full justify-between w-full">
                <section className="w-full flex  flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center justify-center max-w-[448px]">
                        <div className="flex items-start flex-col gap-1 w-full pb-8">
                            <h2 className="text-black text-[28px] leading-[42px] font-bold">
                                Reset your password{" "}
                            </h2>
                            <p className="font-inter-v text-secondary-black pt-1 tracking-[-0.5px]">
                                Enter and confirm your new password
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 pb-16 w-full">
                            <PasswordInput placeholder="New Password (min. of 8 characters)" />
                            <PasswordInput placeholder="Confirm New Password" />
                        </div>

                        <div className="w-full">
                            <CustomButton
                                label="Reset password"
                                loading={false}
                                type="primary"
                                rightIcon={
                                    <Image src={ArrowIcon} alt="info icon" />
                                }
                                className="w-full flex items-center justify-center py-7 px-16 md:px-12 md:py-[22px] rounded-md"
                            />
                            <p className=" text-secondary-black text-center pt-6 text-sm">
                                <span>
                                    <Link
                                        href="/sign-in"
                                        className=" text-primary-green"
                                    >
                                        Return to Sign In{" "}
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageSkeleton>
    )
}

export default page
