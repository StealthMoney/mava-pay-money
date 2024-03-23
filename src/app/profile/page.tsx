"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"

import useProfile from "@/hooks/useProfileHook"
import { useToast } from "@/hooks/useToast"
import { KYCStatus } from "@prisma/client"

import EditIcon from "../assets/svgs/edit-icon.svg"
import KycIcon from "../assets/svgs/kyc-icon.svg"
import CaretRight from "../assets/svgs/right-caret-icon.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import DialogBox from "../components/dialog/Dialog"
import { RegistrationNavbar } from "../components/registration"
import Wrapper from "../components/wrapper"
import { ProfileBlock } from "./ProfileBlock"

const Page = () => {
    const router = useRouter()
    const { data, status } = useSession()
    const { profile, loading, error } = useProfile()
    const { showToast } = useToast()

    const [open, setOpen] = useState(false)

    if (status !== "authenticated") {
        redirect("/sign-in")
    }
    const kycStatus = data.user.kycStatus as KYCStatus

    const handleGetAddress = () => {
        if (kycStatus === KYCStatus.APPROVED) {
            if (!profile.lnAddress) {
                router.push("/create-address")
                return
            }
            router.push(
                `/get-address?username=${profile.lnAddress.split("@")[0]}`
            )
            return
        } else if (kycStatus === KYCStatus.NOT_SUBMITTED) {
            router.push("/kyc")
        }
    }

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(profile.lnAddress || "").then(() => {
            showToast("Address copied to clipboard", "success")
        })
    }

    useEffect(() => {
        setTimeout(() => {
            if (kycStatus === KYCStatus.APPROVED && !profile.lnAddress) {
                setOpen(true)
            }
        }, 5000)
    }, [profile.lnAddress, kycStatus])

    return (
        <main className="min-h-screen h-full w-full bg-white flex flex-col items-center">
            <RegistrationNavbar
                routeName={"Log Out"}
                href={"#"}
                onClick={() => {
                    signOut()
                }}
                className="sticky top-0"
            />

            <Wrapper className="flex items-center justify-center w-full h-full px-0 xl:px-0 pt-12">
                <div className="bg-white flex h-full justify-between w-full pb-[92px] md:pb-28">
                    <section className="w-full flex  flex-col items-center justify-center">
                        <div className="w-full flex flex-col items-center justify-center max-w-[1030px]">
                            <div className="flex items-start flex-col gap-1 w-full pb-2 md:pb-7">
                                <h2 className="text-black text-[28px] md:text-[32px] md:leading-[48px] font-bold font-rebond">
                                    My Profile
                                </h2>
                            </div>

                            <div
                                className={`flex items-center w-full gap-1 md:gap-5 px-4 pl-0 md:px-8 border-[1.5px] ${kycStatus === KYCStatus.PENDING ? "border-orange-400 bg-orange-50" : "border-secondary-red bg-tertiary-red"} rounded-xl h-[140px] md:h-[200px] ${kycStatus === KYCStatus.APPROVED ? "hidden" : "block"}`}
                            >
                                <Image
                                    src={KycIcon}
                                    alt="kyc icon"
                                    className=" h-[100px] w-[100px] md:h-[120px] md:w-[120px]"
                                />
                                <section className="flex flex-col gap-3">
                                    <div className="flex flex-col">
                                        <h3 className=" text-secondary-black text-base md:text-2xl font-bold md:leading-9 font-rebond">
                                            {kycStatus === KYCStatus.PENDING
                                                ? "KYC Verification Pending"
                                                : kycStatus ===
                                                    KYCStatus.REJECTED
                                                  ? "KYC Verification Rejected"
                                                  : "Complete Your KYC"}
                                        </h3>
                                        <p
                                            className={`text-secondary-black text-[10px] md:text-xl font-inter-v`}
                                        >
                                            {kycStatus === KYCStatus.PENDING
                                                ? `We're verifying your credentials. We will let you know when it's done.`
                                                : kycStatus ===
                                                    KYCStatus.REJECTED
                                                  ? `Your KYC verification was rejected. Please contact support at info@mavapay.co if you have any questions.`
                                                  : `Complete your KYC by providing your
                                            bank details and carrying out face
                                            identification. This process is
                                            quick and easy, and it will only
                                            take a few minutes.`}
                                        </p>
                                    </div>

                                    <Link
                                        href="/kyc"
                                        className={`font-semibold text-secondary-red flex gap-1 w-fit text-sm md:text-base ${(kycStatus === KYCStatus.PENDING || kycStatus === KYCStatus.REJECTED) && "hidden"}`}
                                    >
                                        Complete KYC
                                        <Image
                                            src={CaretRight}
                                            alt="right care icon"
                                        />
                                    </Link>
                                </section>
                            </div>
                            <div
                                className={`border border-card-border rounded-xl w-full mt-6 p-4 pt-6 md:pt-10 md:p-10 ${!error ? "hidden" : "block"}`}
                            >
                                {!error && (
                                    <div className="flex items-center justify-center w-full h-[60dvh]">
                                        <p className="text-red-500 text-center md:text-xl">
                                            {error}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`border border-card-border rounded-xl w-full mt-6 p-4 pt-6 md:pt-10 md:p-10 ${error ? "hidden" : "block"}`}
                            >
                                <div className=" pb-6 md:pb-10">
                                    <section className=" flex items-center justify-between">
                                        <div className=" flex items-center gap-5">
                                            <section className=" flex items-center justify-center h-16 w-16 md:h-[120px] md:w-[120px] bg-primary-green rounded-[50%]">
                                                <h1 className=" text-2xl md:text-5xl font-semibold font-rebond">
                                                    {`${
                                                        profile.user?.firstName
                                                            .charAt(0)
                                                            .toUpperCase() || ""
                                                    }${
                                                        profile.user?.lastName
                                                            .charAt(0)
                                                            .toUpperCase() || ""
                                                    }`}
                                                </h1>
                                            </section>
                                            <section className="flex flex-col gap-1">
                                                <h3 className=" font-bold font-rebond text-base md:text-2xl md:leading-9 text-secondary-black">
                                                    {profile.user?.firstName}{" "}
                                                </h3>
                                                <p className=" text-xs md:text-base text-tertiary-gray">
                                                    {profile.user?.email}
                                                </p>
                                            </section>
                                        </div>

                                        <div>
                                            <CustomButton
                                                label={
                                                    kycStatus ===
                                                    KYCStatus.APPROVED
                                                        ? "LN Bank Address"
                                                        : "Get LN Bank Address"
                                                }
                                                loading={false}
                                                type="primary"
                                                rightIcon={
                                                    kycStatus !==
                                                        KYCStatus.APPROVED && (
                                                        <Image
                                                            src={EditIcon}
                                                            alt="info icon"
                                                        />
                                                    )
                                                }
                                                className={`w-[149px] h-12 items-center justify-center px-5 py-3 rounded-md md:flex hidden ${kycStatus === KYCStatus.REJECTED ? "hidden" : "block"}`}
                                                buttonProps={{
                                                    title: `${kycStatus === KYCStatus.APPROVED ? "LN Bank Address" : "Get LN Bank Address"}`,
                                                    onClick: handleGetAddress
                                                }}
                                            />
                                        </div>
                                    </section>
                                </div>
                                <div className=" pt-6 md:pt-10 border-t border-t-card-border pb-5 flex flex-col md:flex-row items-start gap-5 md:gap-16">
                                    {loading ? (
                                        <section className="flex items-center justify-center w-full h-[60dvh]">
                                            <div className="m-auto border-[3px] border-[#ffffff] rounded-[50%] border-t-3 border-t-[#2EAE4E] max-w-[24px] max-h-[24px] w-[24px] h-[24px] animate-spin"></div>
                                        </section>
                                    ) : (
                                        <>
                                            <section className=" flex flex-col gap-[6px]">
                                                <h3 className=" font-bold text-secondary-black font-rebond">
                                                    Personal Information
                                                </h3>
                                            </section>

                                            <section className=" w-full flex flex-col gap-6">
                                                <div className=" flex flex-col md:flex-row items-center gap-6 w-full">
                                                    <ProfileBlock
                                                        title="First Name"
                                                        value={
                                                            profile.user
                                                                ?.firstName ||
                                                            "..."
                                                        }
                                                    />
                                                    <ProfileBlock
                                                        title="Last Name"
                                                        value={
                                                            profile.user
                                                                ?.lastName ||
                                                            "..."
                                                        }
                                                    />
                                                </div>
                                                <ProfileBlock
                                                    title="Middle Name"
                                                    value={
                                                        profile.user
                                                            ?.middleName ||
                                                        "..."
                                                    }
                                                />
                                                <ProfileBlock
                                                    title="Email Address"
                                                    value={
                                                        profile.user?.email ||
                                                        "..."
                                                    }
                                                />
                                                <ProfileBlock
                                                    placeHolder="Username"
                                                    value={profile?.lnAddress}
                                                    onEditClick={
                                                        !profile?.lnAddress
                                                            ? handleGetAddress
                                                            : undefined
                                                    }
                                                    onCopyClick={
                                                        profile?.lnAddress
                                                            ? handleCopyAddress
                                                            : undefined
                                                    }
                                                />
                                                <ProfileBlock placeHolder="Account Number" />
                                                <ToastContainer />
                                            </section>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>

            <DialogBox
                isOpen={open}
                title="Set up your LN bank address"
                ctaOnClick={() => router.push("/create-address")}
                ctaText="Set up"
                onDismiss={() => setOpen(false)}
            >
                <div className="flex items-center justify-center w-full">
                    <p className="text-secondary-black text-center text-lg md:text-2xl font-rebond font-light text-clip max-w-xs">
                        Create your mavapay money lightning address to start
                        receiving payments
                    </p>
                </div>
            </DialogBox>
        </main>
    )
}

export default Page
