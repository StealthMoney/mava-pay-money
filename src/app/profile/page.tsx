"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import KycIcon from "../assets/svgs/kyc-icon.svg"
import EditIcon from "../assets/svgs/edit-icon.svg"
import PencilIcon from "../assets/svgs/pencil-icon.svg"
import CaretRight from "../assets/svgs/right-caret-icon.svg"
import { RegistrationNavbar } from "../components/registration"
import { CustomButton } from "../components/custom-button/CustomButton"
import Wrapper from "../components/wrapper"
import { ProfileBlock } from "./ProfileBlock"
import { ProfileModal } from "./ProfileModal"

const Page = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <main className="min-h-screen h-full w-full bg-white flex flex-col items-center">
            <RegistrationNavbar
                routeName={"Log Out"}
                href={"#"}
                onClick={() => {}}
                className=" sticky top-0"
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

                            <div className=" flex items-center gap-1 md:gap-5 px-4 pl-0 md:px-8 border-[1.5px] border-secondary-red rounded-xl h-[140px] md:h-[200px] bg-tertiary-red">
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

                            <div className="border border-card-border rounded-xl w-full mt-6 p-4 pt-6 md:pt-10 md:p-10">
                                <div className=" pb-6 md:pb-10">
                                    <section className=" flex items-center justify-between">
                                        <div className=" flex items-center gap-5">
                                            <section className=" flex items-center justify-center h-16 w-16 md:h-[120px] md:w-[120px] bg-primary-green rounded-[50%]">
                                                <h1 className=" text-2xl md:text-5xl font-semibold font-rebond">
                                                    BO
                                                </h1>
                                            </section>
                                            <section className="flex flex-col gap-1">
                                                <h3 className=" font-bold font-rebond text-base md:text-2xl md:leading-9 text-secondary-black">
                                                    Bamidele Oladimeji
                                                </h3>
                                                <p className=" text-xs md:text-base text-tertiary-gray">
                                                    thetimileyin@gmail.com
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
                                    <section className=" flex flex-col gap-[6px]">
                                        <h3 className=" font-bold text-secondary-black font-rebond">
                                            Personal Information
                                        </h3>
                                        <p className=" text-sm text-subtext-gray whitespace-nowrap">
                                            Update your personal details here.
                                        </p>
                                    </section>

                                    <section className=" w-full flex flex-col gap-6">
                                        <div className=" flex flex-col md:flex-row items-center gap-6 w-full">
                                            <ProfileBlock
                                                title="First Name"
                                                value="Oladimeji"
                                            />
                                            <ProfileBlock
                                                title="Last Name"
                                                value="Bamidele"
                                            />
                                        </div>
                                        <ProfileBlock
                                            title="Middle Name"
                                            value="Oluwatimileyin"
                                        />
                                        <ProfileBlock
                                            title="Email Address"
                                            value="thetimileyin@gmail.com"
                                        />
                                        <ProfileBlock
                                            placeHolder="Username"
                                            onCopyClick={() => {}}
                                        />
                                        <ProfileBlock placeHolder="Account Number" />
                                        <ProfileBlock placeHolder="Bank Name" />
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>
            {open && <ProfileModal onClose={() => setOpen(false)} />}
        </main>
    )
}

export default Page
