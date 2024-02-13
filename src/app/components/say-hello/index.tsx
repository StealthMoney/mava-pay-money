"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

import {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    MAVAPAY_SUPPORT_EMAIL
} from "@/config/process"
import emailjs from "@emailjs/browser"

import ArrowIcon from "../../assets/svgs/arrow.svg"
import GithubIcon from "../../assets/svgs/github-icon.svg"
import PlaneIcon from "../../assets/svgs/plane.svg"
import SayHelloIcon from "../../assets/svgs/say-hello-icon.svg"
import TwitterIcon from "../../assets/svgs/twitter.svg"
import { CustomButton } from "../custom-button/CustomButton"
import { CustomInput } from "../custom-input/CustomInput"
import Wrapper from "../wrapper"

interface InputEventHandler {
    input: React.ChangeEvent<HTMLInputElement>
    textArea: React.ChangeEvent<HTMLTextAreaElement>
}

export const SayHello = () => {
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        message: ""
    })

    React.useEffect(() => {
        emailjs.init(EMAILJS_PUBLIC_KEY)
    }, [])

    const handleSubmit = async () => {
        if (
            !formValues.message.length ||
            !formValues.name.length ||
            !formValues.email.length
        ) {
            return
        }

        try {
            setLoading(true)
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: `${formValues.name}_${formValues.email}`,
                    to_name: "Mavapay money support",
                    message: formValues.message,
                    reply_to: MAVAPAY_SUPPORT_EMAIL
                },
                EMAILJS_PUBLIC_KEY
            )

            alert("Your message sent successfully!")
        } catch (error) {
            console.log(error)
            alert("Your message was not sent. Please try again!")
        } finally {
            setLoading(false)
            setFormValues({ name: "", email: "", message: "" })
        }
    }

    const handleChange = (
        event: InputEventHandler[keyof InputEventHandler]
    ) => {
        event.preventDefault()
        const { value, name } = event.target

        setFormValues((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="py-16 md:py-[100px] bg-secondary-white w-full flex flex-col items-center justify-center border border-card-border">
            <Wrapper>
                <div className=" flex flex-col gap-10 md:gap-20 w-full">
                    <section className=" w-full flex flex-col items-center">
                        <h1
                            className="text-secondary-black text-[32px] md:text-[40px] font-bold leading-[48px] md:leading-[60px] tracking-[0.8px] text-center font-rebond"
                            id="contact-us"
                        >
                            Say Hello{" "}
                        </h1>
                        <p className="text-secondary-black pt-4 text-center text-base md:text-xl leading-[150%] max-w-[564px] font-inter-v">
                            We are here to help and answer any questions you
                            might have. We look forward to hearing from you.
                        </p>
                    </section>

                    <section className="flex gap-16 md:gap-32 w-full items-center">
                        {/* <form onSubmit={handleSubmit} className=' w-full'> */}
                        <div className="flex flex-col gap-7 max-w-full md:max-w-[549px] w-full">
                            <CustomInput
                                inputProps={{
                                    placeholder: "First Name",
                                    style: {
                                        border: "1.5px solid #DBE1E7",
                                        backgroundColor: "#F7F8F9",
                                        fontSize: "16px",
                                        color: "#090909"
                                    },
                                    onChange: handleChange,
                                    name: "name",
                                    type: "text",
                                    value: formValues.name
                                }}
                                className="py-[22px] px-5 placeholder:text-black"
                            />
                            <CustomInput
                                inputProps={{
                                    placeholder: "Email Address",
                                    style: {
                                        border: "1.5px solid #DBE1E7",
                                        backgroundColor: "#F7F8F9",
                                        fontSize: "16px",
                                        color: "#090909"
                                    },
                                    onChange: handleChange,
                                    name: "email",
                                    type: "email",
                                    value: formValues.email
                                }}
                                className=" placeholder:text-black"
                            />
                            <textarea
                                className="bg-secondary-gray border-[1.5px] py-[26px] px-5 h-[230px] md:h-[300px] border-card-border rounded-lg placeholder:text-secondary-black text-secondary-black font-rebond placeholder:font-light font-medium"
                                placeholder="Message"
                                onChange={handleChange}
                                name="message"
                                value={formValues.message}
                            />
                            <CustomButton
                                label={"Send Message"}
                                type="primary"
                                className="py-5 px-7 md:px-12 md:py-[22px] flex items-center justify-center text-sm md:text-xl"
                                rightIcon={
                                    <Image src={ArrowIcon} alt="info icon" />
                                }
                                disabled={
                                    formValues.name.length === 0 ||
                                    formValues.email.length === 0 ||
                                    formValues.message.length === 0
                                }
                                loading={loading}
                                buttonProps={{
                                    onClick: handleSubmit
                                }}
                            />
                        </div>
                        {/* </form> */}

                        <section className=" hidden md:flex flex-col gap-10">
                            <Image src={SayHelloIcon} alt="say hello icon" />
                            <div className="flex flex-col gap-3">
                                <p className=" font-medium text-base text-secondary-black font-rebond">
                                    FOLLOW US:
                                </p>
                                <div className="flex gap-6">
                                    {SocialLinks.map((item) => (
                                        <Link href={item.link} key={item.alt}>
                                            <Image
                                                src={item.imgSrc}
                                                alt={item.alt}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </section>
                </div>
            </Wrapper>
        </div>
    )
}

export const SocialLinks = [
    { link: "", imgSrc: TwitterIcon, alt: "twitter icon" },
    { link: "", imgSrc: PlaneIcon, alt: "plane icon" },
    {
        link: "https://github.com/StealthMoney/mava-pay-money",
        imgSrc: GithubIcon,
        alt: "github icon"
    }
]
