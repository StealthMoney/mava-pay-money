import React from "react";
import { CustomButton } from "../custom-button/CustomButtom";

export const LaunchBanner = () => {
  return (
    <div className='w-full flex items-center justify-center gap-3 py-[15px] max-h-16 h-full bg-banner-color'>
      <section>
        <CustomButton
          label='INFO'
          type='primary'
          buttonProps={{ style: { padding: "6px 12px", borderRadius: "1000px", width: "fit-content", height: "fit-content" } }}
          disabled={true}
        />
      </section>
      <p className='text-xl text-white font-medium tracking-[0.6px] whitespace-nowrap'>We are launching soon. Stay tuned and be there 🚀🫵🏿</p>
    </div>
  );
};
