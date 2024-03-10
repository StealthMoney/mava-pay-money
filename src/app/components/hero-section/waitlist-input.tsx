"use client"

import Image from "next/image"
import { useState } from "react"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import InfoIcon from "../../assets/svgs/info.svg"
import { CustomButton } from "../custom-button/CustomButton"
import { CustomInput } from "../custom-input/CustomInput"
import { addToWaitlist } from "../waitlist/waitlist-server"

export const JoinWaitlist = () => {
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
        if (window.innerWidth < 768) {
            const waitlistSection = document.getElementById("waitlist")
            if (waitlistSection) {
                waitlistSection.scrollIntoView({ behavior: "smooth" })
            }
            return
        }
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
            <div className={`text-left ${!error && !isUserAdded && "hidden"}`}>
                {isUserAdded && !error && (
                    <p className="hidden md:block text-green-500 text-sm md:text-xl font-medium md:font-semibold font-rebond">
                        {isUserAdded}
                    </p>
                )}
                {error && (
                    <p className="hidden md:block text-red-600 text-sm md:text-xl font-medium md:font-semibold font-rebond">
                        {error}
                    </p>
                )}
            </div>
            <section className="hidden md:flex flex-col gap-2 md:max-w-[588px]">
                <CustomInput
                    inputProps={{
                        placeholder: "Email Address",
                        color: "white",
                        value: email,
                        onChange: handleInputChange
                    }}
                    className=" bg-transparent text-white placeholder:text-white"
                />
                <aside className="flex gap-1">
                    <Image src={InfoIcon} alt="info icon" />
                    <p className="text-xs text-secondary-gray font-inter-v">
                        Mavapay.money is launching soon, be the first to know
                        when we launch
                    </p>
                </aside>
            </section>
            <CustomButton
                label="Join Waitlist"
                type="primary"
                rightIcon={<Image src={ArrowIcon} alt="info icon" />}
                className="w-full md:w-fit flex items-center justify-center py-7 px-16 md:px-12 md:py-[22px] rounded-none rounded-bl-3xl rounded-br-3xl md:rounded-md"
                loading={loading}
                disabled={loading}
                buttonProps={{
                    onClick: handleSubmit
                }}
            />
        </>
    )
}
