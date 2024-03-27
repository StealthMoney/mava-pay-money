"use client"

import "react-toastify/dist/ReactToastify.css"

import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from "react"
import { ToastContainer } from "react-toastify"

import { useToast } from "@/hooks/useToast"

import ArrowIcon from "../assets/svgs/arrow.svg"
import CopyIcon from "../assets/svgs/copy-icon.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import PageSkeleton from "../components/page-skeleton/PageSkeleton"

const Page = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get("username")
    const { showToast } = useToast()

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(`${username}@mavapay.money`).then(() => {
            showToast("Address copied to clipboard", "success")
        })
    }

    return (
        <PageSkeleton
            navbarRouteName={"Log Out"}
            navbarHref="#0#0"
            onClick={() => signOut()}
            className="h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <div className=" w-full">
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                        Your Lightning bank address{" "}
                    </h2>
                    <p className="font-inter-v text-black pt-1 tracking-[-0.5px]">
                        BTC received on this address will be settled in your
                        bank account attached to this address as Naira
                    </p>
                </div>
                <div className="flex flex-col gap-6 pb-16 w-full">
                    <section className=" p-5 py-[17px] flex items-center justify-between border border-card-border rounded-md bg-secondary-gray">
                        <section className="flex flex-col gap-1">
                            <p className=" font-inter-v text-tertiary-gray text-xs leading-[18px]">
                                Your lightning bank address
                            </p>
                            <p className="font-medium font-rebond text-secondary-black">{`${username}@mavapay.money`}</p>
                        </section>
                        <button onClick={handleCopyAddress}>
                            <Image src={CopyIcon} alt="copy" />
                        </button>
                    </section>
                </div>
            </div>

            <div className="w-full">
                <CustomButton
                    label="Copy address"
                    loading={false}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="arrow icon" />}
                    buttonProps={{
                        onClick: handleCopyAddress
                    }}
                    className="w-full flex items-center justify-center py-7 px-16 md:px-12 md:py-[22px] rounded-md"
                />
                <p className=" text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                    <span>
                        <Link href="/profile" className=" text-primary-green">
                            Go back to profile{" "}
                        </Link>
                    </span>
                </p>
            </div>
            <ToastContainer />
        </PageSkeleton>
    )
}

export default Page
