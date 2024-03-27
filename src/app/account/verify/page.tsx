import { prisma } from "@/lib/prisma"
import { sendVerificationToken } from "@/utils/auth-token"
import { Suspense } from "react"
import ConfirmEmailTemplate from "@/app/components/confirm-email-template"

const verifyUser = async (key: string) => {
    "use server"
    try {
        const verification = await prisma.verification.findUnique({
            where: {
                token: key
            }
        })
        if (!verification) {
            return {
                data: {
                    message: "Invalid token"
                }
            }
        }
        if (verification.expiresAt < new Date()) {
            return {
                data: {
                    data: verification,
                    message: "Token expired",
                    success: false
                }
            }
        }
        await prisma.user.update({
            where: {
                email: verification.userEmail
            },
            data: {
                verified: true
            }
        })
        await prisma.verification.delete({
            where: {
                id: verification.id
            }
        })
        return {
            data: {
                message: "Account verified!",
                success: true
            }
        }
    } catch (error) {
        return {
            data: {
                message: "Invalid verification token",
                success: false
            }
        }
    }
}

export default async function Page({
    searchParams
}: {
    searchParams: { key: string; email: string }
}) {
    const { email } = searchParams
    const key = searchParams.key

    const { data } = await verifyUser(key)
    if (data.message === "Token expired") {
        await prisma.verification.delete({
            where: {
                id: data.data?.id
            }
        })

        const res = await sendVerificationToken({
            email,
            userId: data.data?.userId!
        })

        if (res instanceof Error) {
            return (
                <div>
                    <h1 className="text-xl text-black font-semibold">
                        Account Verification Status
                    </h1>
                    <p>{res.message}</p>
                </div>
            )
        }
    }

    return (
        <ConfirmEmailTemplate path="/sign-in">
            <h2 className="text-black text-[28px] leading-[42px] font-bold">
                Account Verification Status
            </h2>
            <Suspense
                fallback={
                    <div>
                        <p className="text-black">Loading...</p>
                    </div>
                }
            >
                <p
                    className={`${data.success ? "text-slate-800" : "text-red-500"} font-inter-v pt-1 tracking-[-0.5px]`}
                >
                    {data.message}
                </p>
                <p
                    className={`${data.success ? "text-slate-800" : "text-red-500"} font-inter-v pt-1 tracking-[-0.5px]`}
                >
                    {data.success
                        ? "Proceed to login"
                        : data.message === "Token expired"
                          ? "Oops! your token is expired, please check your email for new verification token"
                          : "Please try again"}
                </p>
            </Suspense>
        </ConfirmEmailTemplate>
    )
}
