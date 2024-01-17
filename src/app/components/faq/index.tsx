import React from "react";
import { FaqCard } from "./FaqCard";

export const Faq = () => {
  return (
    <div className='py-[100px] px-[100px] bg-secondary-white w-full flex flex-col items-center justify-center'>
      <div className='max-w-[1055px] flex flex-col gap-14 items-center justify-center w-full'>
        <section>
          <h1 className='text-secondary-black text-[40px] font-bold leading-[60px] tracking-[0.8px] text-center max-w-[763px]'>
            Frequently Asked Questions
          </h1>
          <p className='text-secondary-black pt-2 text-center text-xl leading-[150%] max-w-[556px]'>
            Questions you might ask about our products and services. Can’t find the answer you are looking for?{" "}
            <span className='underline text-primary-green'> Contact Us.</span>{" "}
          </p>
        </section>

        <section className='flex flex-col gap-6 w-full'>
          {FaqCopy.map((faq) => (
            <FaqCard {...faq} key={faq.index} />
          ))}
        </section>
      </div>
    </div>
  );
};

export const FaqCopy = [
  {
    index: "01",
    title: "What is Mavapay.money?",
    body: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    index: "02",
    title: "What is a lightning bank address?",
    body: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    index: "03",
    title: "Can I send Bitcoin using Mavapay.Money?",
    body: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    index: "04",
    title: "Why do you need my BVN?",
    body: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
  {
    index: "05",
    title: "What is Mavapay.money?",
    body: "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
  },
];
