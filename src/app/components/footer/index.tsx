import React from "react"
import Link from "next/link"
import Image from "next/image"
import Wrapper from "../wrapper"
import XIcon from "../../assets/svgs/twitter-x-icon.svg"
import FacebookIcon from "../../assets/svgs/facebook.svg"
import CopyrightIcon from "../../assets/svgs/copyright.svg"
import YoutubeIcon from "../../assets/svgs/twitter-x-icon.svg"

export const Footer = () => {
    return (
        <footer className=" pt-20 md:pt-[138px] w-full flex items-center justify-center">
            <Wrapper className=" max-w-[100%]">
                <section className="flex flex-col gap-6 items-center justify-center w-full pb-[100px] md:pb-[120px]">
                    <h3 className=" text-[28px] md:text-[40px] font-extrabold leading-[42px] md:leading-[60px] tracking-[0.96px] font-rebond">
                        MAVAPAY.
                        <span className="text-primary-green">MONEY</span>
                    </h3>
                    <p className=" max-w-[691px] w-full text-center text-base md:text-2xl leading-[28px] md:leading-[40px] text-white tracking-[0.48px] font-inter-v">
                        Experience the speed of Lightning Network transactions.
                        Send and receive Bitcoin in Naira instantly!
                    </p>

                    <div className="flex gap-8 items-center">
                        {FooterCopy.map(({ href, title, imgSrc }) => (
                            <Link
                                href={href}
                                key={title}
                                className="flex gap-2 font-rebond font-light"
                            >
                                <Image src={imgSrc} alt={`${title}_icon`} />
                                <p>{title}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="w-full">
                    <div className="w-full h-[1px] bg-tertiary-gray"></div>
                    <div className="flex flex-col md:flex-row items-center justify-center w-full pt-8 md:pt-12">
                        <p className="text-tertiary-gray text-center text-sm md:text-base md:max-w-4xl md:leading-7 font-light">
                            Mavapay Money is not a foreign remittance or money
                            exchange platform. Mavapay Money is in partnership
                            with third party licensed companies that facilitate
                            and provide other services on its behalf.
                        </p>
                    </div>
                    <div className="flex gap-3 items-center justify-center w-full pt-[28px] pb-[50px] font-rebond font-light text-tertiary-gray">
                        <section className="flex gap-1 items-center">
                            <Image src={CopyrightIcon} alt="copy right icon" />
                            <p>Mavapay.money</p>
                        </section>
                        <p>All Rights Reserved</p>
                    </div>
                </section>
            </Wrapper>
        </footer>
    )
}

export const FooterCopy = [
    {
        href: "https://twitter.com/Mavapay_Money",
        title: "Twitter",
        imgSrc: XIcon
    }
    // {
    //     href: "",
    //     title: "Facebook",
    //     imgSrc: FacebookIcon
    // },
    // {
    //     href: "",
    //     title: "Youtube",
    //     imgSrc: YoutubeIcon
    // }
]
