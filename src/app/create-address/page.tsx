"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import { useCreateAddress } from "@/hooks/useCreateAddress"

import ArrowIcon from "../assets/svgs/arrow.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import { CustomInput } from "../components/custom-input/CustomInput"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import DialogBox from "../components/dialog/Dialog"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    const {
        username,
        isAddressCreated,
        loading,
        error,
        handleCreateAddress,
        handleInputChange
    } = useCreateAddress()

    return (
        <PageSkeleton
            navbarRouteName={"Log Out"}
            navbarHref="#"
            onClick={() => signOut()}
            className="h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <form>
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                        Create Your Lightning bank address{" "}
                    </h2>
                    <p className="font-inter-v text-black pt-1 tracking-[-0.5px]">
                        Create a Lightning bank address which you can use to
                        receive BTC from any wallet that supports lightning in
                        your Naira bank account{" "}
                    </p>
                </div>
                <div className="flex flex-col gap-6 pb-16 w-full">
                    <div className="w-full">
                        {error && (
                            <p className="text-red-500 text-sm text-left font-rebond font-medium">
                                {error}
                            </p>
                        )}
                    </div>
                    <CustomInput
                        inputProps={{
                            placeholder: "Username",
                            name: "email",
                            type: "email",
                            style: { color: "black" },
                            value: username,
                            onChange: handleInputChange
                        }}
                        className="border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                        rightIcon={
                            <p className="font-rebond text-sm font-medium text-subtext-gray">
                                @mavapay.money
                            </p>
                        }
                    />

                    <section>
                        <h2 className="text-primary-green font-rebond font-semibold">
                            Note:
                        </h2>
                        <ol className="flex flex-col gap-y-2 pl-5 text-sm text-subtext-gray font-inter-v pt-1 list-disc">
                            <li>
                                {`Your username will appear in this format
                            "example@mavapay.money".`}
                            </li>
                            <li>
                                You can only use letters and numbers. No special
                                characters like &quot;@&quot;, &quot;#&quot;,
                                &quot;$&quot;, &quot;%&quot;, &quot;&&quot;,
                                &quot;*&quot;, etc.
                            </li>
                            <li>
                                You can&apos;t change your username after
                                creation.
                            </li>
                            <li>You can only create one address per user.</li>
                            <li>
                                If you forget your username, you can always find
                                it in your profile.
                            </li>
                        </ol>
                    </section>
                </div>
            </form>

            <div className="w-full">
                <CustomButton
                    label="Create address"
                    loading={false}
                    disabled={loading || isAddressCreated}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="arrow icon" />}
                    className={`w-full flex items-center justify-center px-5 md:px-5 py-[20px] md:py-[22px] rounded-md ${
                        loading ||
                        (isAddressCreated && "opacity-70 cursor-not-allowed")
                    }`}
                    buttonProps={{
                        onClick: handleCreateAddress
                    }}
                />
                <p className="pb-4 text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                    <span>
                        <Link href="/profile" className=" text-primary-green">
                            Go back to profile{" "}
                        </Link>
                    </span>
                </p>
            </div>

            <DialogBox
                title="Your address has been created"
                description="You can now start receiving BTC in your Naira bank account using your lightning bank address"
                isOpen={isAddressCreated}
                onDismiss={() => router.push("/profile")}
                ctaText="Got it"
                ctaOnClick={() =>
                    router.push(
                        `/get-address?username=${username.split("@")[0]}`
                    )
                }
            >
                <div className="flex justify-center items-center">
                    <p className="text-primary-green text-lg md:text-2xl font-rebond font-medium text-clip max-w-xs">
                        {username}
                    </p>
                </div>
            </DialogBox>
        </PageSkeleton>
    )
}

export default Page
