import React from "react"
import Image from "next/image"
import HeroImage from "../../assets/images/hero-image.webp"

export const HeroSection = () => {
    return (
        <div className="w-full min-h-[calc(100vh-68px)] flex flex-col">
            <div className="flex flex-1 w-full h-full justify-center">
                <div className="px-0 sm:px-0 md:px-5 lg:px-10 xl:px-[100px] w-full max-w-[1440px]">
                    <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center h-full md:justify-between w-full">
                        <section className="flex flex-col gap-10 md:flex-1">
                            <div className="md:max-w-[588px] flex flex-col gap-3 px-5 md:px-0">
                                <h2
                                    className=" text-4xl leading-[150%] lg:text-5xl lg:leading-[72px] font-extrabold font-rebond"
                                    style={{ fontFamily: "Rebond Grotesque" }}
                                >
                                    Global money at your fingertips!
                                </h2>
                                <p className="text-[16px] lg:text-lg leading-[32px] max-w-[532px] font-inter-v">{`Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin`}</p>
                            </div>
                        </section>

                        <section className="max-w-[324px] md:max-w-[620px] md:flex-1 h-full w-full flex flex-col items-center justify-center px-1">
                            <Image
                                src={HeroImage}
                                alt={"hero image"}
                                className="max-h-full"
                            />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
