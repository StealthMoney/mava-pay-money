import React from "react";
import Image from "next/image";
import { HowItWorksCard } from "./HowItWorksCard";
import { CustomButton } from "../custom-button/CustomButtom";
import ArrowIcon from "../../assets/svgs/arrow.svg";

export const HowItWorks = () => {
  return (
    <div className='py-[120px] flex flex-col items-center justify-center bg-secondary-green w-full'>
      <h1 className='text-secondary-black text-[40px] font-bold leading-[60px] tracking-[0.8px] text-center max-w-[763px]'>How it works? </h1>
      <p className='text-secondary-black max-w-[1031px] pt-2 text-center text-xl leading-[150%]'>
        Get started with Mava Money in three (3) easy steps:
      </p>
      <section className='flex justify-between gap-6 pt-20 pb-24'>
        {HowItWorksCopy.map((feature) => (
          <HowItWorksCard {...feature} key={feature.title} />
        ))}
      </section>
      <section>
        <CustomButton
          label='Join Waitlist'
          type='primary'
          buttonProps={{ style: { width: "fit-content" } }}
          labelStyle={{ fontSize: "20px", fontWeight: "600", lineHeight: "32px" }}
          rightIcon={<Image src={ArrowIcon} alt='info icon' />}
        />
      </section>
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
