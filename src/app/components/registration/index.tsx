import React from "react"
import Link from "next/link"
import { UrlObject } from "url"
import Wrapper from "../wrapper"

export interface RegistrationNavbarProps {
    routeName: string
    href: string | UrlObject
    className?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

export const RegistrationNavbar = ({
    routeName,
    href,
    className,
    onClick
}: RegistrationNavbarProps) => {
    return (
        <div
            className={`w-full flex items-center justify-center bg-white z-50 font-rebond border border-nav-border ${className}`}
        >
            <Wrapper className=" w-full">
                <div className="h-[68px] md:h-[100px] w-full flex items-center justify-between">
                    <Link
                        className="text-xl sm:text-2xl font-extrabold leading-9 tracking-[0.96px] font-rebond text-secondary-black"
                        href={"/"}
                    >
                        MAVAPAY.
                        <span className="text-primary-green">MONEY</span>
                    </Link>

                    <Link
                        className="font-rebond font-semibold text-base py-3 px-4 md:py-4 md:px-8 text-secondary-black whitespace-nowrap"
                        href={href}
                        onClick={onClick}
                    >
                        {routeName}
                    </Link>
                </div>
            </Wrapper>
        </div>
    )
}
