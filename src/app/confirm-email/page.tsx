import React from "react"
import ConfirmEmailTemplate from "../components/confirm-email-template"

const Page = () => {
    return (
        <ConfirmEmailTemplate path="/sign-in">
            <h2 className="text-black text-[28px] leading-[42px] font-bold">
                Check your mail{" "}
            </h2>
            <p className="font-inter-v text-subtext-gray pt-1 tracking-[-0.5px]">
                We have sent a confirmation mail to your email address.{" "}
            </p>
        </ConfirmEmailTemplate>
    )
}

export default Page
