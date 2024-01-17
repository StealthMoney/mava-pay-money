import React from "react";

export type ButtonProps = {
  label: string;
  labelStyle?: React.CSSProperties;
  rightIcon?: React.ReactNode;
  type?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
};

export const CustomButton = ({ label, labelStyle, rightIcon, type, disabled, loading, buttonProps }: ButtonProps) => {
  return (
    <div className='flex w-full items-center gap-4'>
      <button
        {...buttonProps}
        disabled={disabled}
        className={`${
          type === "primary" ? "bg-primary-green hover:opacity-70" : "bg-transparent border border-green-border text-primary-green hover:opacity-70"
        } ${disabled ? "pointer-events-none" : "cursor-pointer"}  rounded-md w-full px-12 py-[22px] whitespace-nowrap flex items-center gap-[10px]`}
      >
        <p className='text-sm' style={labelStyle}>
          {label}
        </p>
        {rightIcon}
      </button>
      {loading ? <span className='animate-spin w-4 h-4 rounded-[50%] border-t-[2.5px] border-r-2 border-black inline-block box-border'></span> : null}
    </div>
  );
};

