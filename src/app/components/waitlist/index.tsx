import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import { CustomInput } from "../custom-input/CustomInput";
import { CustomButton } from "../custom-button/CustomButtom";
import ArrowIcon from "../../assets/svgs/arrow.svg";

export const WaitList = () => {
  return (
    <div className='py-10 md:py-20 bg-secondary-white w-full flex items-center justify-center'>
      <Wrapper>
        <div className=' bg-secondary-black rounded-2xl w-full flex flex-col pt-7 md:pt-[96px] pb-7 md:pb-[126px] px-7 items-center justify-center gap-5 md:gap-10'>
          <section className=' w-full flex flex-col items-center'>
            <h1 className='text-white text-xl md:text-[40px] font-bold leading-[30px] md:leading-[60px] tracking-[0.8px] text-center font-rebond'>
              Join Our Waitlist
            </h1>
            <p className='text-white pt-3 text-center text-sm md:text-xl leading-[150%] font-inter-v'>
              By joining our Waitlist, you will be the first to know when we launch! 🚀
            </p>
          </section>

          <section className='flex flex-col md:flex-row gap-5 md:gap-6 max-w-[824px] w-full'>
            <CustomInput
              inputProps={{
                style: { width: "100%", backgroundColor: "#090909", border: "1.5px solid #494949" },
                placeholder: "Email Address",
              }}
              className='py-[13.5px] px-5 md:py-[26px] placeholder:text-white'
            />
            <div>
              <CustomButton
                label='Join Waitlist'
                type='primary'
                className='text-sm md:text-xl font-medium md:font-semibold md:max-w-[251px] md:min-w-[251px] leading-8 py-4 md:py-[24.5px] px-6 md:px-12 flex items-center justify-center h-[54px] md:h-fit'
                rightIcon={<Image src={ArrowIcon} alt='info icon' />}
              />
            </div>
          </section>
        </div>
      </Wrapper>
    </div>
  );
};
