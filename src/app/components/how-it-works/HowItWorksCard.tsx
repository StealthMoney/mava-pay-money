import React from "react";

type HowItWorksCardProps = {
  stepNo: string;
  title: string;
  body: string;
};

export const HowItWorksCard = ({ stepNo, title, body }: HowItWorksCardProps) => {
  return (
    <div className='flex flex-col gap-6 md:gap-9 items-center justify-center max-w-[397px] w-full'>
      <section className='flex flex-col items-center justify-center h-20 w-20 md:h-[100px] md:w-[100px] rounded-lg bg-primary-green'>
        <h2 className='text-center text-[28px] md:text-[40px] font-semibold tracking-[1.6px]'>{stepNo}</h2>
      </section>
      <section className='flex flex-col items-center gap-2 md:gap-1 text-secondary-black'>
        <h3 className='text-[28px] md:text-2xl font-bold leading-[42px] md:leading-[36px] text-center'>{title}</h3>
        <p className='text-base text-center'>{body}</p>
      </section>
    </div>
  );
};
