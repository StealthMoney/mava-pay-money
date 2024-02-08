import { prisma } from "@/lib/prisma"
import { Suspense } from "react"

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
        await prisma.user.update({
            where: {
                id: verification.userId
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
    searchParams: { key: string }
}) {
    const { data } = await verifyUser(searchParams.key)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className=" bg-green-300 p-6 text-center border border-green-400 rounded-sm">
                <h1 className="text-xl text-black font-semibold">
                    Account Verification Status
                </h1>
                <Suspense
                    fallback={
                        <div>
                            <p className="text-black">Loading...</p>
                        </div>
                    }
                >
                    <p
                        className={`${data.success ? "text-slate-800" : "text-red-500"}`}
                    >
                        {data.message}
                    </p>
                    <p
                        className={`${data.success ? "text-slate-800" : "text-red-500"}`}
                    >
                        {data.success ? "Proceed to login" : "Please try again"}
                    </p>
                </Suspense>
            </div>
        </div>
    )
}
