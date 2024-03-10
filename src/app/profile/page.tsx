"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import useProfile from "@/hooks/useProfileHook"

import EditIcon from "../assets/svgs/edit-icon.svg"
import KycIcon from "../assets/svgs/kyc-icon.svg"
import PencilIcon from "../assets/svgs/pencil-icon.svg"
import CaretRight from "../assets/svgs/right-caret-icon.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import { RegistrationNavbar } from "../components/registration"
import Wrapper from "../components/wrapper"
import { ProfileBlock } from "./ProfileBlock"
import { ProfileModal } from "./ProfileModal"
import { KYCStatus } from "@prisma/client"

const Page = () => {
    const [open, setOpen] = React.useState(false)
    const { profile, loading, error } = useProfile()

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
                            <div className="flex items-start flex-col gap-1 w-full pb-7">
                                <h2 className="text-black text-[28px] md:text-[32px] md:leading-[48px] font-bold font-rebond">
                                    My Profile
                                </h2>
                            </div>

                            <div
                                className={`flex items-center gap-1 md:gap-5 px-4 pl-0 md:px-8 border-[1.5px] border-secondary-red rounded-xl h-[140px] md:h-[200px] bg-tertiary-red ${profile?.user?.kycInfo?.status === KYCStatus.APPROVED ? "hidden" : "block"}`}
                            >
                                <Image
                                    src={KycIcon}
                                    alt="kyc icon"
                                    className=" h-[100px] w-[100px] md:h-[120px] md:w-[120px]"
                                />
                                <section className="flex flex-col gap-3">
                                    <div className="flex flex-col">
                                        <h3 className=" text-secondary-black text-base md:text-2xl font-bold md:leading-9 font-rebond">
                                            Complete Your KYC
                                        </h3>
                                        <p className=" text-secondary-black text-[10px] md:text-xl font-inter-v">
                                            Complete your KYC by providing your
                                            bank details and carrying out face
                                            identification. This process is
                                            quick and easy, and it will only
                                            take a few minutes.
                                        </p>
                                    </div>

                                    <Link
                                        href="/kyc"
                                        className=" font-semibold text-secondary-red flex gap-1 w-fit text-sm md:text-base"
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
                                                label="Edit Profle"
                                                loading={false}
                                                type="primary"
                                                rightIcon={
                                                    <Image
                                                        src={EditIcon}
                                                        alt="info icon"
                                                    />
                                                }
                                                className="w-[149px] h-12 items-center justify-center px-5 py-3 rounded-md md:flex hidden"
                                                buttonProps={{
                                                    onClick: () =>
                                                        setOpen(!open)
                                                }}
                                            />

                                            <button
                                                onClick={() => setOpen(!open)}
                                            >
                                                <Image
                                                    src={PencilIcon}
                                                    alt="pencil icon"
                                                    className="block md:hidden"
                                                />
                                            </button>
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
                                                {/* <p className=" text-sm text-subtext-gray whitespace-nowrap">
                                            Update your personal details here.
                                        </p> */}
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
                                                    onCopyClick={() => {}}
                                                />
                                                <ProfileBlock placeHolder="Account Number" />
                                                <ProfileBlock placeHolder="Bank Name" />
                                            </section>
                                        </>
                                    )}
                                </div>
                                d
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>
            {open && (
                <ProfileModal
                    onClose={() => setOpen(false)}
                    profileData={profile}
                />
            )}
        </main>
    )
}

export default Page
