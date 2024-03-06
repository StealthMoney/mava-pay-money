import React from "react"

export type ButtonProps = {
    label: string
    rightIcon?: React.ReactNode
    type?: "primary" | "secondary"
    disabled?: boolean
    loading?: boolean
    className?: string
    buttonProps?: React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
}

export const CustomButton = ({
    label,
    rightIcon,
    type,
    disabled,
    loading = false,
    className,
    buttonProps
}: ButtonProps) => {
    return (
        <div className="flex w-full items-center gap-4">
            <button
                {...buttonProps}
                disabled={disabled}
                className={`${
                    type === "primary"
                        ? "bg-primary-green hover:opacity-70"
                        : "bg-transparent border border-green-border text-primary-green hover:opacity-70"
                } ${
                    disabled ? "pointer-events-none" : "cursor-pointer"
                }  rounded-md w-full px-12 py-5 md:py-[22px] whitespace-nowrap flex items-center font-rebond font-medium md:font-semibold relative ${className}`}
            >
                <section className=" flex items-center gap-2">
                    {label}
                    <aside className=" hidden md:block">{rightIcon}</aside>
                </section>
                {loading ? (
                    <section className=" absolute right-[64px]">
                        <div className="m-auto border-[3px] border-[#ffffff] rounded-[50%] border-t-3 border-t-[#2EAE4E] max-w-[24px] max-h-[24px] w-[24px] h-[24px] animate-spin"></div>
                    </section>
                ) : null}
            </button>
        </div>
    )
}
