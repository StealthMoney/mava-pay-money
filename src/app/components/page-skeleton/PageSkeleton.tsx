import React from "react"
import { RegistrationNavbar } from "../registration"
import Wrapper from "../wrapper"

export interface PageSkeletonProps {
    navbarRouteName: string
    navbarHref: string
    children: React.ReactNode
}

const PageSkeleton = ({
    navbarRouteName,
    navbarHref,
    children
}: PageSkeletonProps) => {
    return (
        <main className="max-h-screen h-screen bg-white flex flex-col items-center">
            <RegistrationNavbar routeName={navbarRouteName} href={navbarHref} />
            <Wrapper className="flex items-center justify-center w-full h-full px-0 xl:px-0">
                {children}
            </Wrapper>
        </main>
    )
}

export default PageSkeleton
