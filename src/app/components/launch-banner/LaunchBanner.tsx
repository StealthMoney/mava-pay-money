import React from "react";
import { CustomButton } from "../custom-button/CustomButtom";

export const LaunchBanner = () => {
  return (
    <div className='w-full flex items-center justify-center gap-3 py-6 md:py-[15px] min-h-16 h-full bg-none md:bg-banner-color px-5'>
      <section className='hidden md:flex'>
        <CustomButton
          label='INFO'
          type='primary'
          buttonProps={{ style: { padding: "6px 12px", borderRadius: "1000px", width: "fit-content", height: "fit-content" } }}
          disabled={true}
        />
      </section>
      <p className='text-sm md:text-xl text-white font-medium tracking-[0.42px] md:tracking-[0.6px] text-center break-words'>
        We are launching soon. Stay tuned and be there 🚀🫵🏿
      </p>
    </div>
  );
};
