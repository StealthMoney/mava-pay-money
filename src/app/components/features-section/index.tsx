import React from "react";
import { FeatureCard } from "./FeatureCard";
import BulbIcon from "../../assets/svgs/bulb.svg";
import ChartIcon from "../../assets/svgs/charts.svg";
import LightningIcon from "../../assets/svgs/lightningIcon.svg";

export const FeaturesSection = () => {
  return (
    <div className='py-[120px] flex flex-col items-center justify-center bg-white w-full'>
      <h1 className='text-secondary-black text-[40px] font-bold leading-[60px] tracking-[0.8px] text-center max-w-[763px]'>
        We make it effortless to transfer/receive Bitcoin in Naira
      </h1>
      <p className='text-secondary-black max-w-[1031px] pt-2 text-center text-xl leading-[150%]'>
        Immerse yourself in the rapid pace of Lightning Network transactions. Instantly send and receive Bitcoin, seamlessly converting it into Naira!
      </p>
      <section className='flex justify-between gap-6 pt-20'>
        {FeaturesCopy.map((feature) => (
          <FeatureCard {...feature} key={feature.title} />
        ))}
      </section>
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
