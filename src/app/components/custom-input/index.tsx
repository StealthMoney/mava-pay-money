import React from "react";

export type CustomInputProps = {
  labelName: string;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  rightIcon?: any;
};

const CustomInput = ({ labelName, inputProps, rightIcon }: CustomInputProps) => {

  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-sm text-black'>{labelName}</label>
      <section className='flex items-center relative'>
        <input {...inputProps} className='text-black border text-sm p-3 px-3 rounded-lg w-full' />
        {rightIcon && <div className='absolute bg-white top-[2px] bottom-[2px] right-[2px] flex items-center justify-center p-3 rounded-[6px] w-12'>{rightIcon}</div>}
      </section>
    </div>
  );
};

export default CustomInput;
