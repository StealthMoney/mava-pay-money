import React from "react";
import Image from "next/image";
import Wrapper from "../wrapper";
import { CustomInput } from "../custom-input/CustomInput";
import { CustomButton } from "../custom-button/CustomButtom";
import ArrowIcon from "../../assets/svgs/arrow.svg";

export const WaitList = () => {
  return (
    <div className='py-[81px] bg-secondary-white w-full'>
      <Wrapper>
        <div className=' bg-secondary-black rounded-2xl w-full flex flex-col pt-[96px] pb-[126px] items-center justify-center gap-10'>
          <section className=' w-full flex flex-col items-center'>
            <h1 className='text-white text-[40px] font-bold leading-[60px] tracking-[0.8px] text-center'>Join Our Waitlist</h1>
            <p className='text-white pt-3 text-center text-xl leading-[150%]'>
              By joining our Waitlist, you will be the first to know when we launch! 🚀
            </p>
          </section>

          <section className='flex gap-6 max-w-[824px] w-full'>
            <CustomInput
              inputProps={{
                style: { width: "100%", backgroundColor: "#090909", border: "1.5px solid #494949" },
                placeholder: "Email Address",
              }}
            />
            <div>
              <CustomButton
                label='Join Waitlist'
                type='primary'
                buttonProps={{ style: { maxWidth: "251px", minWidth: "251px", width: "100%" } }}
                labelStyle={{ fontSize: "20px", fontWeight: "600", lineHeight: "32px" }}
                rightIcon={<Image src={ArrowIcon} alt='info icon' />}
              />
            </div>
          </section>
        </div>
      </Wrapper>
    </div>
  );
};
