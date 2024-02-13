import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React from "react"

type FeatureCardProps = {
    imgSrc: string | StaticImport
    title: string
    body: string
}

export const FeatureCard = ({ imgSrc, title, body }: FeatureCardProps) => {
    return (
        <div className="flex flex-col items-center md:items-start gap-6 md:gap-3 max-w-[397px] w-full">
            <section className="flex flex-col items-center justify-center h-[72px] w-[72px] rounded border border-card-border bg-secondary-gray">
                <Image
                    src={imgSrc}
                    alt={`${title}_image`}
                    width={28}
                    height={28}
                />
            </section>
            <section className="flex flex-col items-center md:items-start gap-2 md:gap-1 text-secondary-black">
                <h3 className=" text-[28px] md:text-2xl font-bold leading-[36px] text-center md:text-start font-rebond">
                    {title}
                </h3>
                <p className="text-2xl md:text-base text-center md:text-start font-inter-v">
                    {body}
                </p>
            </section>
        </div>
    )
}
