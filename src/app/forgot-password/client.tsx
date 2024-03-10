"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { useForgotPassword } from "@/hooks/useForgotPassword"

import ArrowIcon from "../assets/svgs/arrow.svg"
import { CustomButton } from "../components/custom-button/CustomButton"
import { CustomInput } from "../components/custom-input/CustomInput"

export const ForgotPasswordInput = () => {
    const { error, forgotPassword, loading, message, success } =
        useForgotPassword()

    const [email, setEmail] = useState("")
    const [showError, setShowError] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { value } = event.target
        setEmail(value)
    }
    const handleSubmit = async () => {
        setShowError(false)
        await forgotPassword(email)
        if (!error) {
            setEmail("")
        }
    }

    return (
        <>
            <div className=" w-full">
                <div className="flex items-start flex-col gap-1 w-full pb-8">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold font-rebond">
                        Forgot your password?{" "}
                    </h2>
                    <p className="font-inter-v text-secondary-black pt-1 tracking-[-0.5px]">
                        {`Enter your email address and we'll send you a link to reset your password.`}
                    </p>
                </div>
                {error && (
                    <p className="text-red-500 text-sm md:text-xl font-normal md:font-semibold font-rebond">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="text-green-500 text-sm md:text-xl font-medium md:font-semibold font-rebond">
                        {message}
                    </p>
                )}
                <div className="flex flex-col gap-6 md:pb-16 w-full">
                    <CustomInput
                        inputProps={{
                            placeholder: "Email Address",
                            name: "email",
                            type: "email",
                            value: email,
                            style: { color: "black" },
                            onChange: handleInputChange
                        }}
                        className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] md:py-5 px-4"
                    />
                </div>
                <p className="md:hidden block text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                    <span>
                        <Link href="/sign-in" className=" text-primary-green">
                            Return to Sign In{" "}
                        </Link>
                    </span>
                </p>
            </div>

            <div className="w-full">
                <CustomButton
                    label="Continue"
                    loading={loading}
                    disabled={loading}
                    type="primary"
                    rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                    buttonProps={{
                        onClick: handleSubmit
                    }}
                    className="w-full flex items-center justify-center  px-5 md:px-5 py-[20px] md:py-[22px] rounded-md"
                />
                <p className="hidden md:block text-secondary-black text-center pt-6 text-sm font-rebond font-medium">
                    <span>
                        <Link href="/sign-in" className=" text-primary-green">
                            Return to Sign In{" "}
                        </Link>
                    </span>
                </p>
            </div>
        </>
    )
}
