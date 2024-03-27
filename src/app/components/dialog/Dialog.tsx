"use client"

import classNames from "classnames"
import React from "react"

import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"

interface Props {
    children: React.ReactNode
    title?: string
    titleStyle?: string
    description?: string
    descriptionStyle?: string
    onDismiss?: () => void
    ctaText?: string
    ctaStyle?: string
    ctaOnClick?: () => void
    isOpen: boolean
    disableBackgroundAction?: boolean
}

const DialogBox = ({
    title,
    description,
    ctaText,
    isOpen,
    disableBackgroundAction,
    ctaOnClick,
    onDismiss,
    children,
    titleStyle,
    descriptionStyle,
    ctaStyle
}: Props) => (
    <Dialog.Root open={isOpen} modal={disableBackgroundAction}>
        <Dialog.Portal>
            <Dialog.Overlay className="bg-secondary-gray blur-sm opacity-75 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content
                forceMount
                className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
            >
                <Dialog.Title
                    className={classNames(
                        `text-secondary-black m-0 text-[17px] md:text-xl font-medium text-center ${title && "mb-5"}`,
                        titleStyle
                    )}
                >
                    {title}
                </Dialog.Title>
                <Dialog.Description
                    className={classNames(
                        "text-secondary-black text-center mt-[10px] mb-5 text-[15px] md:text-[17px] leading-normal",
                        descriptionStyle
                    )}
                >
                    {description}
                </Dialog.Description>
                {children}
                <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                        <button
                            onClick={ctaOnClick ? ctaOnClick : undefined}
                            className={classNames(
                                `${!ctaOnClick && !ctaText && "hidden"} bg-primary-green text-white hover:opacity-70 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none`,
                                ctaStyle
                            )}
                        >
                            {ctaText}
                        </button>
                    </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                    <button
                        onClick={onDismiss ? onDismiss : undefined}
                        className="text-secondary-black hover:bg-secondary-gray focus:shadow-slate-400 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                    >
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
)

export default DialogBox
