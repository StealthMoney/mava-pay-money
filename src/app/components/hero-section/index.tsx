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
        <Wrapper>
          <div className='flex gap-[72px] items-center h-full justify-between w-full'>
            <section className='flex flex-col gap-10'>
              <div className='max-w-[549px] flex flex-col gap-3'>
                <h2 className='text-5xl leading-[72px] font-extrabold '>Global money at your fingertips!</h2>
                <p className='text-lg leading-[32px] max-w-[532px]'>{`Experience the speed of Lightning Network transactions. Receive Naira from anywhere 'lightning fast', with Bitcoin`}</p>
              </div>

              <div className='flex flex-col gap-7'>
                <section className='flex flex-col gap-2'>
                  <CustomInput inputProps={{ placeholder: "Email Address" }} />
                  <aside className='flex gap-1'>
                    <Image src={InfoIcon} alt='info icon' />
                    <p className='text-xs text-secondary-gray'>Mavapay.money is launching soon, be the first to know when we lauch</p>
                  </aside>
                </section>
                <CustomButton
                  label='Join Waitlist'
                  type='primary'
                  buttonProps={{ style: { width: "fit-content" } }}
                  labelStyle={{ fontSize: "20px", fontWeight: "600", lineHeight: "32px" }}
                  rightIcon={<Image src={ArrowIcon} alt='info icon' />}
                />
              </div>
            </section>

            <section className=''>
              <Image src={HeroImage} alt={"hero image"} className='w-full' />
            </section>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};
