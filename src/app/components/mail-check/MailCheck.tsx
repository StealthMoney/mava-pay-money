import React from "react"
import MailCheckImage from "../../assets/svgs/mail-check.svg"
import Image from "next/image"
import { CustomButton } from "../custom-button/CustomButton"

export const MailCheck = () => {
    return (
        <div className=" w-full flex flex-col h-full gap-16 justify-between md:justify-center pt-[114px] md:pt-0">
            <section className="flex flex-col items-center gap-7">
                <Image src={MailCheckImage} alt="mail check image" />
                <div className=" text-center flex flex-col gap-1">
                    <h2 className="text-black text-[28px] leading-[42px] font-bold">
                        Check your mail{" "}
                    </h2>
                    <p className="font-inter-v text-subtext-gray pt-1 tracking-[-0.5px]">
                        We have sent a confirmation mail to your email address.{" "}
                    </p>
                </div>
            </section>
            <CustomButton
                label="Return to homepage"
                loading={false}
                type="primary"
                className="w-full flex items-center justify-center py-7 px-16 md:px-12 md:py-[22px] rounded-md"
            />
        </div>
    )
}
