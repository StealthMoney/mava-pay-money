import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { JWTPayload, decodeJwt } from "jose"
import { API_DOMAIN } from "@/config/process"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "username/email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `${process.env.VERCEL_URL ?? API_DOMAIN}/api/sign-in`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        headers: { "Content-Type": "application/json" }
                    }
                )

                const user = await res.json()
                console.log({ user })
                if (res.ok && user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/sign-in"
        // signOut: "/account/logout",
    },
    session: {
        // maxAge: 60 * 15 // 15 minutes
        strategy: "jwt"
    },
    callbacks: {
        async signIn({ user }) {
            if (user && user?.token) {
                return true
            } else {
                return false
            }
        },
        async jwt({ token, user }) {
            if (user && user?.token) {
                token.token = user.token
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.accessToken = undefined
            if (token.token) {
                const decoded = decodeJwt(token.token as string) as JWTPayload
                session.accessToken = token.token
                session.expires = new Date(
                    (decoded.exp ?? 0) * 1000
                ).toISOString()
                session.user.id = decoded.id as string
                token.email = decoded.email as string
                session.user.email = decoded.email as string
                session.user.role = decoded.type as string
            }
            return session
        }
    },
    events: {
        signOut: async (message) => {
            const { token } = message
            token.token = undefined
        }
    }
}
