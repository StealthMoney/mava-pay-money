"use client"

import React from "react"
import Image from "next/image"
import EyeCloseSvg from "../../assets/svgs/eye-closed-icon.svg"
import EyeOpenSvg from "../../assets/svgs/eye-open-icon.svg"
import { CustomInput } from "../custom-input/CustomInput"

const PasswordInput = ({ placeholder }: { placeholder: string }) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <CustomInput
            inputProps={{
                placeholder: placeholder,
                name: "password",
                type: isVisible ? "text" : "password",
                style: { color: "black" }
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
    )
}

export default PasswordInput
