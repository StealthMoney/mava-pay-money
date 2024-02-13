"use client"

import React, { useState } from "react"

import PageSkeleton from "../components/page-skeleton/PageSkeleton"
import { KycStepOne } from "../components/kyc-steps/KycStepOne"
import { KycStepTwo } from "../components/kyc-steps/KycStepTwo"

const Page = () => {
    const [step, setStep] = useState({ first: true, second: false })

    return (
        <PageSkeleton
            navbarRouteName={"Log Out"}
            navbarHref="#"
            onClick={() => {}}
            className=" h-full justify-between md:justify-center pt-10 md:pt-0 pb-16 md:pb-0"
        >
            {step.first && (
                <KycStepOne
                    onClickContinue={() =>
                        setStep((prev) => ({
                            ...prev,
                            first: false,
                            second: true
                        }))
                    }
                />
            )}
            {step.second && <KycStepTwo />}
        </PageSkeleton>
    )
}

export default Page
