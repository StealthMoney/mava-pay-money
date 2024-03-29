import React from "react"
import Wrapper from "../wrapper"
import { FaqCard } from "./FaqCard"
import Link from "next/link"

export const Faq = () => {
    return (
        <div className="py-16 md:py-[100px] bg-secondary-white w-full flex flex-col items-center justify-center">
            <Wrapper className="max-w-[1055px] xl:px-0 w-full">
                <div className="flex flex-col gap-14 items-center justify-center w-full">
                    <section>
                        <h1 className="text-secondary-black text-[32px] md:text-[40px] font-bold  leading-[48px] md:leading-[60px] tracking-[0.8px] text-center max-w-[763px] font-rebond">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-secondary-black pt-2 text-center text-base md:text-xl leading-[150%] max-w-[556px] font-inter-v">
                            Questions you might ask about our products and
                            services. Can’t find the answer you are looking for?{" "}
                            <span className="underline text-primary-green">
                                <Link
                                    href="/#contact-us"
                                    className="tracking-[0.32px]"
                                >
                                    Contact Us
                                </Link>
                            </span>
                        </p>
                    </section>

                    <section className="flex flex-col gap-6 w-full">
                        {FaqCopy.map((faq) => (
                            <FaqCard {...faq} key={faq.index} />
                        ))}
                    </section>
                </div>
            </Wrapper>
        </div>
    )
}

export const FaqCopy = [
    {
        index: "01",
        title: "What is Mavapay.money?",
        body: "Mava pay money is a platform that allows you to receive money from your loved ones in any country at the speed of lightning. Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin."
    },
    {
        index: "02",
        title: "What is a lightning bank address?",
        body: "This is a unique address that is generated for you to receive money from anyone using a wallet that supports lightning addresses. The lightning address is linked directly to your Naira bank account. This means that you can receive money from anyone in the world and have it deposited directly into your Naira bank account. An example of a lightning address is - extheo@mavapay.money"
    },
    {
        index: "03",
        title: "Can I send Bitcoin using Mavapay.Money?",
        body: "No, you cannot send Bitcoin using Mavapay.money. At the moment it is a receive only platform."
    },
    {
        index: "04",
        title: "Why do you need my BVN?",
        body: "We need your BVN to verify your identity and to ensure that the bank account you are linking to your lightning address is yours. We do not store your BVN. We use it to verify your identity and then discard it. We take your privacy and security very seriously."
    }
]
