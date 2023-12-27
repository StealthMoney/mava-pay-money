import React from "react";

export type CustomInputProps = {
  labelName: string;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
};

const CustomInput = ({ labelName, inputProps }: CustomInputProps) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
      <label className='text-sm text-black'>{labelName}</label>
      <input {...inputProps} className='text-black border text-sm p-3 px-3 rounded-lg w-full' />
    </div>
  );
};

export default CustomInput;
