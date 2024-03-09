import React from "react"
import Wrapper from "../wrapper"
import { AddToWaitlist } from "./client"

export const WaitList = () => {
    return (
        <div
            id="waitlist"
            className="py-10 md:py-20 bg-secondary-white w-full flex items-center justify-center"
        >
            <Wrapper>
                <div className=" bg-secondary-black rounded-2xl w-full flex flex-col pt-7 md:pt-[96px] pb-7 md:pb-[126px] px-7 items-center justify-center gap-5 md:gap-10">
                    <section className=" w-full flex flex-col items-center">
                        <h1 className="text-white text-xl md:text-[40px] font-bold leading-[30px] md:leading-[60px] tracking-[0.8px] text-center font-rebond">
                            Join Our Waitlist
                        </h1>
                        <p className="text-white pt-3 text-center text-sm md:text-xl leading-[150%] font-inter-v">
                            By joining our Waitlist, you will be the first to
                            know when we launch! 🚀
                        </p>
                    </section>
                    <AddToWaitlist />
                </div>
            </Wrapper>
        </div>
    )
}
