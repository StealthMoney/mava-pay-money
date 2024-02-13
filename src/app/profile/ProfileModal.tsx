import { Cross1Icon } from "@radix-ui/react-icons"
import React from "react"
import { CustomButton } from "../components/custom-button/CustomButton"
import { ProfileBlock } from "./ProfileBlock"

export interface ProfileModalProps {
    onClose: () => void
}

export const ProfileModal = ({ onClose }: ProfileModalProps) => {
    return (
        <div
            className=" h-full max-h-screen w-screen flex flex-col items-center justify-center fixed z-50 bg-[#00000033] overflow-hidden overflow-y-hidden"
            onClick={onClose}
        >
            <div className=" max-w-[1060px] w-full flex flex-col gap-5 md:px-10 px-5">
                <section className=" flex self-end justify-end w-full">
                    <button
                        onClick={onClose}
                        className=" h-10 w-10 flex flex-col items-center justify-center rounded-[50%] bg-white"
                    >
                        <Cross1Icon height={20} width={20} color="#000000" />
                    </button>
                </section>

                <div className=" max-w-[1000px] w-full bg-white rounded-lg p-4 pt-8 md:p-12">
                    <h2 className=" text-secondary-black text-[28px] leading-[42px] font-bold font-rebond">
                        Edit your profile
                    </h2>

                    <section className=" pt-6 md:pt-12 w-full flex flex-col gap-6">
                        <div className=" flex items-center gap-4 md:gap-6 w-full">
                            <ProfileBlock
                                title="First Name"
                                value="Oladimeji"
                            />
                            <ProfileBlock title="Last Name" value="Bamidele" />
                        </div>
                        <div className=" flex items-center gap-4 md:gap-6 w-full">
                            <ProfileBlock
                                title="First Name"
                                value="Oladimeji"
                            />
                            <ProfileBlock title="Last Name" value="Bamidele" />
                        </div>
                        <div className=" flex items-center gap-4 md:gap-6 w-full">
                            <ProfileBlock
                                title="First Name"
                                value="Oladimeji"
                            />
                            <ProfileBlock title="Last Name" value="Bamidele" />
                        </div>
                    </section>

                    <section className=" pt-12 md:pt-[140px] flex flex-col md:flex-row gap-6">
                        <CustomButton
                            label="Discard"
                            loading={false}
                            type="secondary"
                            className="w-full flex items-center justify-center py-[14px] md:py-[22px] rounded-md bg-secondary-green border-[1.5px]"
                            buttonProps={{
                                onClick: onClose
                            }}
                        />
                        <CustomButton
                            label="Save"
                            loading={false}
                            type="primary"
                            className="w-full flex items-center justify-center py-[14px] md:py-[22px] rounded-md"
                        />
                    </section>
                </div>
            </div>
        </div>
    )
}
