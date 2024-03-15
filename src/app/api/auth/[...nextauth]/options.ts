import { decodeJwt, JWTPayload } from "jose"
import { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

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
