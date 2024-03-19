"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

import ArrowIcon from "../assets/svgs/arrow.svg"
import PasswordInput from "../components/password-input"
import { RegistrationNavbar } from "../components/registration"
import { CustomInput } from "../components/custom-input/CustomInput"
import { CustomButton } from "../components/custom-button/CustomButton"
import Wrapper from "../components/wrapper"
import { useSignUpHook } from "@/hooks/useSignUpHook"

const Page = () => {
    const {
        form,
        loading,
        error,
        confirmPassword,
        checked,
        passwordError,
        handleInputChange,
        handleUserSignup,
        handleCheckboxChange,
        handleConfirmPasswordChange
    } = useSignUpHook()
    const { firstName, lastName, middleName, email, password } = form
    return (
        <main className="min-h-screen h-full bg-white flex flex-col items-center">
            <RegistrationNavbar
                routeName={"Sign In"}
                href={"/sign-in"}
                className=" sticky top-0"
            />

            <Wrapper className="flex items-center justify-center w-full h-full px-0 xl:px-0 py-10 md:py-14">
                <div className="bg-white flex h-full justify-between w-full">
                    <section className="w-full flex  flex-col items-center justify-center">
                        <div className="w-full flex flex-col items-center justify-center max-w-[448px]">
                            <div className="flex items-start flex-col gap-1 w-full pb-8">
                                <h2 className=" text-secondary-black text-[28px] leading-[42px] font-bold">
                                    Sign Up
                                </h2>
                                <p className="font-inter-v text-secondary-black pt-1 tracking-[-0.5px]">
                                    Create an account let’s get you started with
                                    Mavapay.Money.{" "}
                                    <span className=" font-semibold">
                                        (Please enter your names as they are on
                                        your bank account).
                                    </span>
                                </p>
                                <p className=" text-red-500 text-sm text-center w-full">
                                    {error}
                                </p>
                            </div>

                            <div className=" flex flex-col gap-6 w-full">
                                <section className="flex gap-6 w-full">
                                    <CustomInput
                                        inputProps={{
                                            placeholder: "First Name",
                                            name: "firstName",
                                            type: "text",
                                            style: { color: "black" },
                                            onChange: handleInputChange,
                                            value: firstName
                                        }}
                                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                                    />
                                    <CustomInput
                                        inputProps={{
                                            placeholder: "Last Name",
                                            name: "lastName",
                                            type: "text",
                                            style: { color: "black" },
                                            onChange: handleInputChange,
                                            value: lastName
                                        }}
                                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                                    />
                                </section>
                                <CustomInput
                                    inputProps={{
                                        placeholder: "Middle Name (Optional)",
                                        name: "middleName",
                                        type: "text",
                                        style: { color: "black" },
                                        onChange: handleInputChange,
                                        value: middleName
                                    }}
                                    className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                                />
                                <CustomInput
                                    inputProps={{
                                        placeholder: "Enter your email address",
                                        name: "email",
                                        type: "email",
                                        style: { color: "black" },
                                        onChange: handleInputChange,
                                        value: email
                                    }}
                                    className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                                />
                                <PasswordInput
                                    placeholder="New Password (min. of 8 characters)"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
                                />
                                <PasswordInput
                                    placeholder="Confirm New Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    infoText={
                                        passwordError ? passwordError : ""
                                    }
                                />
                            </div>

                            <div className="w-full flex flex-col gap-16 pt-5">
                                <div>
                                    <section className="flex items-start gap-2">
                                        <input
                                            type="checkbox"
                                            className=" accent-primary-green h-4 w-4 cursor-pointer"
                                            onChange={handleCheckboxChange}
                                            checked={checked}
                                        />
                                        <p className=" text-xs font-rebond text-secondary-black font-light">
                                            I have read, understood and I agree
                                            to Mavapay.Money’{" "}
                                            <span>
                                                <Link
                                                    className=" underline text-primary-green"
                                                    href={"/privacy-policy"}
                                                >
                                                    Privacy Policy
                                                </Link>
                                            </span>
                                            , and{" "}
                                            <span>
                                                <Link
                                                    className=" underline text-primary-green"
                                                    href={
                                                        "/terms-and-conditions"
                                                    }
                                                >
                                                    Terms and conditions
                                                </Link>
                                                .
                                            </span>
                                        </p>
                                    </section>
                                </div>
                                <CustomButton
                                    label="Sign Up"
                                    loading={loading}
                                    type="primary"
                                    rightIcon={
                                        <Image
                                            src={ArrowIcon}
                                            alt="info icon"
                                        />
                                    }
                                    className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                                    buttonProps={{
                                        onClick: handleUserSignup
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>
        </main>
    )
}

export default Page
