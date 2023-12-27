import React from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
};

const CustomButton = ({ label, disabled, loading, buttonProps }: ButtonProps) => {
  return (
    <div className='flex w-full items-center gap-4'>
      <button {...buttonProps} disabled={disabled} className='bg-black rounded-lg w-full p-3'>
        <p className='text-sm'>{label}</p>
      </button>
      {loading ? <span className='animate-spin w-4 h-4 rounded-[50%] border-t-[2.5px] border-r-2 border-black inline-block box-border'></span> : null}
    </div>
  );
};

export default CustomButton;
