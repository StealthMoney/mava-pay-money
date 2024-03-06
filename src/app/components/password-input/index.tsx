"use client"

import React from "react"
import Image from "next/image"
import EyeCloseSvg from "../../assets/svgs/eye-closed-icon.svg"
import EyeOpenSvg from "../../assets/svgs/eye-open-icon.svg"
import { CustomInput } from "../custom-input/CustomInput"

const PasswordInput = ({
    placeholder,
    name,
    value,
    onChange,
    infoText
}: {
    placeholder: string
    name: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    infoText?: string
}) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <div className=" flex flex-col w-full gap-1">
            <CustomInput
                inputProps={{
                    placeholder: placeholder,
                    name: name,
                    value: value,
                    onChange: onChange,
                    type: isVisible ? "text" : "password",
                    style: { color: "black" },
                    required: true
                }}
                className=" border border-card-border text-black placeholder:font-light placeholder:text-tertiary-gray py-[18px] px-4"
                rightIcon={
                    <button onClick={() => setIsVisible(!isVisible)}>
                        {isVisible ? (
                            <Image
                                src={EyeOpenSvg}
                                alt="eye"
                                height={20}
                                width={20}
                            />
                        ) : (
                            <Image
                                src={EyeCloseSvg}
                                alt="eye"
                                height={20}
                                width={20}
                            />
                        )}
                    </button>
                }
            />
            {infoText ? (
                <p className=" text-red-500 text-sm">{infoText}</p>
            ) : null}
        </div>
    )
}

export default PasswordInput
