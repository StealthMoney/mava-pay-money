import React from "react";

type HowItWorksCardProps = {
  stepNo: string;
  title: string;
  body: string;
};

export const HowItWorksCard = ({ stepNo, title, body }: HowItWorksCardProps) => {
  return (
    <div className='flex flex-col gap-9 items-center justify-center max-w-[397px] w-full'>
      <section className='flex flex-col items-center justify-center h-[100px] w-[100px] rounded-lg bg-primary-green'>
        <h2 className='text-center text-[40px] font-semibold tracking-[1.6px]'>{stepNo}</h2>
      </section>
      <section className='flex flex-col items-center gap-1 text-secondary-black'>
        <h3 className='text-2xl font-bold leading-[36px]'>{title}</h3>
        <p className='text-base text-center'>{body}</p>
      </section>
    </div>
  );
};
