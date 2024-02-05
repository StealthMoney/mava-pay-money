import React from "react";
import { FeatureCard } from "./FeatureCard";
import BulbIcon from "../../assets/svgs/bulb.svg";
import ChartIcon from "../../assets/svgs/charts.svg";
import LightningIcon from "../../assets/svgs/lightningIcon.svg";
import Wrapper from "../wrapper";

export const FeaturesSection = () => {
  return (
    <div className=' py-20 lg:py-[120px] bg-white w-full'>
      <Wrapper>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='text-secondary-black text-[32px] leading-[48px] lg:text-[40px] font-bold lg:leading-[60px] tracking-[0.8px] text-center max-w-[763px]'>
            We make it effortless to transfer/receive Bitcoin in Naira
          </h1>
          <p className='text-secondary-black max-w-[1031px] pt-2 text-center text-base leading-[28px] lg:text-xl lg:leading-[150%]'>
            Immerse yourself in the rapid pace of Lightning Network transactions. Instantly send and receive Bitcoin, seamlessly converting it into
            Naira!
          </p>
          <section className='flex flex-col md:flex-row gap-16 justify-between md:gap-7 pt-16 md:pt-20 w-full'>
            {FeaturesCopy.map((feature) => (
              <FeatureCard {...feature} key={feature.title} />
            ))}
          </section>
        </div>
      </Wrapper>
    </div>
  );
};

export const FeaturesCopy = [
  {
    imgSrc: LightningIcon,
    title: "Fast Transactions",
    body: "Experience the speed of Lightning Network transactions. Send and receive Bitcoin in Naira instantly!",
  },
  {
    imgSrc: BulbIcon,
    title: "Simplicity",
    body: "Conveniently receive Bitcoin funds directly to your Nigerian bank account. No hassle, no intermediaries!",
  },
  {
    imgSrc: ChartIcon,
    title: "Competitive Exchange Rate",
    body: "Competitive exchange rate, ensuring you get the most value out of your transactions. Seamlessly maximise your financial returns.",
  },
];
