"use client"

import Image from "next/image"
import { useState } from "react"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import { CustomButton } from "../custom-button/CustomButton"
import { CustomInput } from "../custom-input/CustomInput"
import { addToWaitlist } from "./waitlist-server"

export const AddToWaitlist = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [isUserAdded, setIsUserAdded] = useState("")
    const [loading, setLoading] = useState(false)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { value } = event.target
        setEmail(value)
    }
    const handleSubmit = async () => {
        setError("")
        setIsUserAdded("")
        if (!email.length) {
            setError("Please enter a valid email address")
            return
        }
        setLoading(true)
        try {
            const res = await addToWaitlist(email)
            if (res.error && !res.success) {
                setError(res.error)
                setLoading(false)
                return
            }
            setLoading(false)
            setIsUserAdded("Thank you for joining our waitlist! 🚀")
            setEmail("")
        } catch (error) {
            setLoading(false)
            setIsUserAdded("")
            setError("Oops! something went wrong, please try again")
        }
    }
    return (
        <>
            <div className="text-center">
                {isUserAdded && !error && (
                    <p className="text-green-500 text-sm md:text-xl font-medium md:font-semibold font-rebond">
                        {isUserAdded}
                    </p>
                )}
                {error && (
                    <p className="text-red-600 text-sm md:text-xl font-medium md:font-semibold font-rebond">
                        {error}
                    </p>
                )}
            </div>
            <section className="flex flex-col md:flex-row gap-5 md:gap-6 max-w-[824px] w-full">
                <CustomInput
                    inputProps={{
                        style: {
                            width: "100%",
                            backgroundColor: "#090909",
                            border: "1.5px solid #494949"
                        },
                        placeholder: "Email Address",
                        name: "name",
                        type: "email",
                        value: email,
                        onChange: handleInputChange
                    }}
                    className="py-[13.5px] px-5 md:py-[26px] placeholder:text-white"
                />
                <div>
                    <CustomButton
                        label="Join Waitlist"
                        type="primary"
                        className="text-sm md:text-xl font-medium md:font-semibold md:max-w-[251px] md:min-w-[251px] leading-8 py-4 md:py-[24.5px] px-6 md:px-12 flex items-center justify-center h-[54px] md:h-fit"
                        rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                        loading={loading}
                        disabled={loading}
                        buttonProps={{
                            onClick: handleSubmit
                        }}
                    />
                </div>
            </section>
        </>
    )
}
