import React from "react"
import Image from "next/image"
import DarkCopyIcon from "../assets/svgs/dark-copy-icon.svg"

export interface ProfileBlockProps {
    title?: string
    value?: string
    placeHolder?: string
    onCopyClick?: (value: string) => void
}

export const ProfileBlock = ({
    title,
    value,
    placeHolder,
    onCopyClick
}: ProfileBlockProps) => {
    return (
        <section className="py-2 md:py-4 p-4 h-14 md:h-[60px] flex items-center justify-between border-[0.82px] border-card-border rounded-md bg-secondary-gray w-full">
            <section className=" flex flex-col gap-1">
                <p className=" font-rebond text-tertiary-gray text-[10px] leading-[18px] font-light">
                    {title}
                </p>
                <p className=" font-medium font-rebond text-secondary-black text-sm">
                    {value ? (
                        value
                    ) : (
                        <span className=" font-medium text-sm text-tertiary-gray">
                            {placeHolder}
                        </span>
                    )}
                </p>
            </section>

            {onCopyClick ? (
                <button>
                    <Image src={DarkCopyIcon} alt="copy" />
                </button>
            ) : null}
        </section>
    )
}