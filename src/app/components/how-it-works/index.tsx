import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import { HowItWorksCard } from "./HowItWorksCard";
import { CustomButton } from "../custom-button/CustomButtom";
import ArrowIcon from "../../assets/svgs/arrow.svg";
import BentArrowIcon from "../../assets/svgs/bent-arrow.svg";

export const HowItWorks = () => {
  return (
    <div className='py-20 lg:py-[120px] bg-secondary-green w-full'>
      <Wrapper>
        <div className='flex flex-col items-center justify-center bg-secondary-green w-full'>
          <h1 className='text-secondary-black text-[32px] md:text-[40px] font-bold leading-[48px] md:leading-[60px] tracking-[0.8px] text-center max-w-[763px]'>
            How it works?{" "}
          </h1>
          <p className='text-secondary-black max-w-[1031px] pt-2 text-center text-base md:text-xl leading-[28px] md:leading-[150%]'>
            Get started with Mava Money in three (3) easy steps:
          </p>
          <section className='flex md:flex-row flex-col items-start justify-between gap-20 md:gap-6 pt-20 md:pb-24 relative w-full'>
            <div className=' hidden md:flex w-full absolute top-[104px] items-center justify-evenly'>
              <Image src={BentArrowIcon} alt={"hero image"} className=' md:max-w-[120px] lg:max-w-[184px] max-h-[32px]' />
              <Image src={BentArrowIcon} alt={"hero image"} className=' md:max-w-[120px] max lg:max-w-[184px] max-h-[32px]' />
            </div>
            {HowItWorksCopy.map((feature) => (
              <HowItWorksCard {...feature} key={feature.title} />
            ))}
          </section>
          <section className=' hidden md:block'>
            <CustomButton
              label='Join Waitlist'
              type='primary'
              rightIcon={<Image src={ArrowIcon} alt='info icon' />}
              className='text-xl font-semibold leading-8 px-12 py-[22px]'
            />
          </section>
        </div>
      </Wrapper>
    </div>
  );
};

export const HowItWorksCopy = [
  {
    stepNo: "01",
    title: "Create Your Account",
    body: "Create an account by providing your first and last name, email address, bank account and Bank Verification Number.",
  },
  {
    stepNo: "02",
    title: "Setup Lightning Bank Address",
    body: "After creating your account, you will be provided with a Lightning bank address, which will be your username",
  },
  {
    stepNo: "03",
    title: "Receive Payment",
    body: "Once you have your lightning bank address, you are all set. You can use this address to receive money in your Naira account",
  },
];
