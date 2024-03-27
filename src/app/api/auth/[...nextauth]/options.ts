import { decodeJwt, JWTPayload } from "jose"
import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

import { prisma } from "@/lib/prisma"
import { KYCRepository } from "@/services/prisma/repository/kyc"

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
                const baseUrl =
                    process.env.NODE_ENV === "development"
                        ? `http://${req?.headers?.host}`
                        : `https://${req?.headers?.host}`
                console.log({ baseUrl })
                const res = await fetch(`${baseUrl}/api/sign-in`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })

                console.log({ res })
                const user = await res.json()
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
                const decoded = decodeJwt(user.token as string) as JWTPayload
                const expires = new Date((decoded.exp ?? 0) * 1000)

                token.token = user.token
                token.userId = decoded.id as string
                token.email = decoded.email as string
                token.role = decoded.type as string
                token.expires = expires.toISOString()
                token.kycStatus = decoded.kyc_status as string
            } else if (!user && token.userId) {
                const updatedKYC = await KYCRepository(prisma).getKYCByUserId(
                    Number(token.userId)
                )
                if (updatedKYC instanceof Error) {
                    return token
                }
                token.kycStatus = updatedKYC.status as string
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token.token) {
                session.expires = token.expires as string
                session.accessToken = token.token as string
                session.user.id = token.userId as string
                session.user.email = token.email as string
                session.user.role = token.role as string
                session.user.kycStatus = token.kycStatus as string
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
