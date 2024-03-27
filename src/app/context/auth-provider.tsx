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
            const sessionExpiry = new Date(session.expires).getTime()
            const now = new Date().getTime()
            if (sessionExpiry < now) {
                signOut()
            }
        }, 5000) // check every 5 seconds

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
