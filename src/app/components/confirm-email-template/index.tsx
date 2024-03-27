"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import PageSkeleton from "../page-skeleton/PageSkeleton"
import { CustomButton } from "../custom-button/CustomButton"
import MailCheckImage from "../../assets/svgs/mail-check.svg"

const ConfirmEmailTemplate = ({
    path,
    children
}: {
    path: string
    children: React.ReactNode
}) => {
    const router = useRouter()

    return (
        <PageSkeleton
            navbarRouteName={"Sign In"}
            navbarHref={"/sign-in"}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <div className=" w-full flex flex-col h-full gap-16 justify-between md:justify-center pt-[114px] md:pt-0">
                <section className="flex flex-col items-center gap-7">
                    <Image src={MailCheckImage} alt="mail check image" />
                    <div className=" text-center flex flex-col gap-1">
                        {children}
                    </div>
                </section>
                <CustomButton
                    label="Return to Sign In"
                    loading={false}
                    type="primary"
                    className="w-full flex items-center justify-center py-5 px-12 md:px-12 md:py-[22px] rounded-md"
                    buttonProps={{
                        onClick: () => router.push(path)
                    }}
                />
            </div>
        </PageSkeleton>
    )
}

export default ConfirmEmailTemplate
