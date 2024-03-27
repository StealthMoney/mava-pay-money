"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"

import { CustomButton } from "../custom-button/CustomButton"
import Wrapper from "../wrapper"

export const Navbar = () => {
    const router = useRouter()
    const [openMenu, setOpenMenu] = React.useState(false)

    return (
        <div className="w-full flex items-center justify-center sticky top-0 bg-secondary-black z-50 font-rebond ">
            <Wrapper className="w-full">
                <div className="h-[68px] md:h-[100px] w-full flex items-center justify-between">
                    <Link
                        className=" text-xl sm:text-2xl font-extrabold leading-9 tracking-[0.96px] font-rebond"
                        href={"/"}
                    >
                        MAVAPAY.
                        <span className="text-primary-green">MONEY</span>
                    </Link>
                    <section className="hidden md:flex items-center gap-5 md:gap-10 text-sm md:text-base font-light">
                        <Link href="/#contact-us" className="tracking-[0.32px]">
                            Contact Us
                        </Link>
                    </section>

                    <section className="hidden md:flex items-center gap-5">
                        <CustomButton
                            label="Sign In"
                            type="secondary"
                            buttonProps={{
                                style: { padding: "16px 32px" },
                                onClick: () => {
                                    router.push("/sign-in")
                                }
                            }}
                        />
                        <CustomButton
                            label="Sign Up"
                            type="primary"
                            buttonProps={{
                                style: { padding: "16px 32px" },
                                onClick: () => {
                                    router.push("/sign-up")
                                }
                            }}
                        />
                    </section>

                    <button
                        className="md:hidden"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {openMenu ? (
                            <Cross1Icon height="32px" width="32px" />
                        ) : (
                            <HamburgerMenuIcon height="32px" width="32px" />
                        )}
                    </button>
                </div>
                {openMenu ? (
                    <section className="md:hidden flex bg-secondary-black z-50 flex-col absolute top-[68px] right-0 left-0 bottom-0 h-screen overflow-y-scroll overscroll-y-none">
                        <Link
                            href="#contact-us"
                            className="tracking-[0.32px] text-white text-xl py-8 px-5 border-t border-b border-input-border"
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            Contact Us
                        </Link>

                        <section className=" pt-[50px] p-5 flex flex-col gap-6">
                            <CustomButton
                                label="Sign Up"
                                type="primary"
                                className="py-5 px-8 flex items-center justify-center"
                                buttonProps={{
                                    onClick: () => {
                                        setOpenMenu(!openMenu)
                                        router.push("/sign-up")
                                    }
                                }}
                            />
                            <CustomButton
                                label="Sign In"
                                type="secondary"
                                className="py-5 px-8 flex items-center justify-center"
                                buttonProps={{
                                    onClick: () => {
                                        setOpenMenu(!openMenu)
                                        router.push("/sign-in")
                                    }
                                }}
                            />
                        </section>
                    </section>
                ) : null}
            </Wrapper>
        </div>
    )
}
