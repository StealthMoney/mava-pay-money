'use client'

import React from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

type FaqCardProps = {
  index: string;
  title: string;
  body: string;
};

export const FaqCard = ({ index, title, body }: FaqCardProps) => {
  const [collapse, setCollapse] = React.useState<{ [key: string]: boolean }>({ [index]: false });
  const toggle = () => setCollapse((prev) => ({ ...prev, [index]: !collapse[index] }));

  return (
    <div className='flex flex-col min-h-[92px] p-8 py-6 rounded border border-card-border bg-secondary-gray w-full'>
      <section className='flex justify-between w-full'>
        <div className='flex gap-7 items-center'>
          <section className='flex flex-col items-center justify-center h-[44px] w-[44px] rounded-md bg-primary-green'>
            <h2 className='text-center text-xl font-bold tracking-[2px]'>{index}</h2>
          </section>
          <h3 className='text-xl text-secondary-black font-semibold leading-[30px]'>{title}</h3>
        </div>

        {collapse[index] ? (
          <button className=' cursor-pointer' onClick={toggle}>
            <TriangleUpIcon color='black' width='24px' height='24px' />
          </button>
        ) : (
          <button className=' cursor-pointer' onClick={toggle}>
            <TriangleDownIcon color='black' width='24px' height='24px' />
          </button>
        )}
      </section>

      {collapse[index] ? (
        <section className='pt-4 w-full'>
          <p className='text-base text-secondary-black'>{body}</p>
        </section>
      ) : null}
    </div>
  );
};
