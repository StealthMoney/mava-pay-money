"use client"

import { decodeJwt } from "jose"
import { SessionProvider } from "next-auth/react"

import { useSession, signOut } from "next-auth/react"
import { useEffect } from "react"

export function SessionCheckComponent({
    children
}: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession()

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!session?.accessToken) {
                signOut({ redirect: false })
                return
            }

            const decodedToken = decodeJwt(session?.accessToken ?? "")
            if (!decodedToken) {
                signOut({ redirect: false })
                return
            }
            const expires = new Date((decodedToken.exp ?? 0) * 1000)
            if (expires < new Date()) {
                signOut({
                    redirect: false
                })
            }
        }, 60000) // check every minute

        return () => clearInterval(intervalId)
    }, [session, status])

    return <>{children}</>
}

export default function AuthProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
            <SessionCheckComponent>{children}</SessionCheckComponent>
        </SessionProvider>
    )
}
