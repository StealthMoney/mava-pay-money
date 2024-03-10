import React from "react"

import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import { ForgotPasswordInput } from "./client"

const page = () => {
    return (
        <PageSkeleton
            navbarRouteName={"Sign Up"}
            navbarHref={"/sign-up"}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            <ForgotPasswordInput />
        </PageSkeleton>
    )
}

export default page
