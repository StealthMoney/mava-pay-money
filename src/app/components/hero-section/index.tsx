import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import { CustomInput } from "../custom-input/CustomInput";
import { CustomButton } from "../custom-button/CustomButtom";
import { Navbar } from "../navbar";
import { LaunchBanner } from "../launch-banner/LaunchBanner";
import InfoIcon from "../../assets/svgs/info.svg";
import ArrowIcon from "../../assets/svgs/arrow.svg";
import HeroImage from "../../assets/svgs/hero-icon.svg";

export const HeroSection = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar />
      <LaunchBanner />

      <div className='flex flex-1 w-full'>
        <div className='px-0 sm:px-0 md:px-5 lg:px-10 xl:px-[100px] w-full'>
          <div className='flex flex-col-reverse md:flex-row md:gap-16 items-center h-full justify-between w-full'>
            <section className='flex flex-col gap-10'>
              <div className='md:max-w-[549px] flex flex-col gap-3 px-5 sm:px-0 md:px-0'>
                <h2 className=' text-4xl leading-[150%] lg:text-5xl lg:leading-[72px] font-extrabold'>Global money at your fingertips!</h2>
                <p className='text-[16px] lg:text-lg leading-[32px] max-w-[532px]'>{`Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin`}</p>
              </div>

              <div className='flex flex-col gap-7 w-full'>
                <section className=' hidden md:flex flex-col gap-2'>
                  <CustomInput inputProps={{ placeholder: "Email Address" }} />
                  <aside className='flex gap-1'>
                    <Image src={InfoIcon} alt='info icon' />
                    <p className='text-xs text-secondary-gray'>Mavapay.money is launching soon, be the first to know when we lauch</p>
                  </aside>
                </section>
                <CustomButton
                  label='Join Waitlist'
                  type='primary'
                  rightIcon={<Image src={ArrowIcon} alt='info icon' />}
                  className='w-full md:w-fit flex items-center justify-center py-7 px-16 md:px-12 md:py-[22px] rounded-none rounded-bl-3xl rounded-br-3xl md:rounded-md'
                />
              </div>
            </section>

            <section className=' max-w-[324px] md:max-w-full'>
              <Image src={HeroImage} alt={"hero image"} className='w-full' />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
