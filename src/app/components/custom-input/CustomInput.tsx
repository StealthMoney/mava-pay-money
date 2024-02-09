import React from "react";

export type CustomInputProps = {
  labelName?: string;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  rightIcon?: any;
  className?: string
};

export const CustomInput = ({ labelName, inputProps, rightIcon, className }: CustomInputProps) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      {labelName ? <label className='text-sm text-black'>{labelName}</label> : null}
      <section className='flex items-center relative'>
        <input
          {...inputProps}
          className={`text-white border-[1.5px] bg-secondary-gray border-input-border text-base py-[26px] px-5 rounded-md w-full placeholder:font-rebond placeholder:font-light ${className}`}
        />
        {rightIcon && (
          <div className='absolute bg-white top-[2px] bottom-[2px] right-[2px] flex items-center justify-center p-3 rounded-[6px] w-12'>
            {rightIcon}
          </div>
        )}
      </section>
    </div>
  );
};
