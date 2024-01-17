"use client";

import React from "react";
import Link from "next/link";
import Wrapper from "../wrapper";
import { CustomButton } from "../custom-button/CustomButtom";

export const Navbar = () => {
  return (
    <Wrapper>
      <div className='h-[100px] w-full flex items-center justify-between'>
        <h3 className='text-2xl font-extrabold leading-9 tracking-[0.96px]'>
          MAVAPAY.<span className='text-primary-green'>MONEY</span>
        </h3>
        <section className='flex items-center gap-10'>
          <Link href='' className='tracking-[0.32px]'>
            Contact Us
          </Link>
          <Link href='https://github.com/StealthMoney/mava-pay-money' className='tracking-[0.32px]'>
            GitHub
          </Link>
        </section>

        <section className='flex items-center gap-5'>
          <CustomButton label='Sign In' type='secondary' buttonProps={{ style: { padding: "16px 32px" } }} />
          <CustomButton label='Sign Up' type='primary' buttonProps={{ style: { padding: "16px 32px" } }} />
        </section>
      </div>
    </Wrapper>
  );
};
