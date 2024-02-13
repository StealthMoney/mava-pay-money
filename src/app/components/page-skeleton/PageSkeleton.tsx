import React from "react"
import { RegistrationNavbar } from "../registration"
import Wrapper from "../wrapper"

export interface PageSkeletonProps {
    navbarRouteName: string
    navbarHref: string
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

const PageSkeleton = ({
    navbarRouteName,
    navbarHref,
    children,
    onClick
}: PageSkeletonProps) => {
    return (
        <main className="max-h-screen h-screen bg-white flex flex-col items-center">
            <RegistrationNavbar
                routeName={navbarRouteName}
                href={navbarHref}
                onClick={onClick}
            />
            <Wrapper className="flex items-center justify-center w-full h-full px-0 xl:px-0">
                <div className="bg-white flex h-full justify-between w-full">
                    <section className="w-full flex  flex-col items-center justify-center">
                        <div className="w-full flex flex-col items-center justify-center max-w-[448px]">
                            {children}
                        </div>
                    </section>
                </div>
            </Wrapper>
        </main>
    )
}

export default PageSkeleton
