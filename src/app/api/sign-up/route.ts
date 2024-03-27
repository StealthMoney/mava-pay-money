import { prisma } from "@/lib/prisma"
import { AccountRepository, UserRepository } from "@/services/prisma/repository"
import { KYCRepository } from "@/services/prisma/repository/kyc"
import { sendVerificationToken } from "@/utils/auth-token"
import { createPassword } from "@/utils/password"

type RequestBody = {
    firstName: string
    lastName: string
    middleName: string
    email: string
    password: string
}

export async function POST(req: Request) {
    const requestBody = (await req.json()) as RequestBody
    const { firstName, lastName, middleName, email, password } = requestBody

    const requiredFields = [
        "firstName",
        "lastName",
        "middleName",
        "email",
        "password"
    ]
    const requestBodyObjectKeys = Object.keys(requestBody)
    const missingFields = requiredFields.filter(
        (field) => !requestBodyObjectKeys.includes(field)
    )

    if (
        missingFields.length > 0 ||
        !email.includes("@") ||
        !email.includes(".")
    ) {
        return new Response(
            JSON.stringify({
                error: `missing fields - ${missingFields.join(", ")}`
            }),
            {
                status: 400
            }
        )
    }

    if (password.length < 8) {
        return new Response(
            JSON.stringify({ error: "password must be at least 8 characters" }),
            {
                status: 400
            }
        )
    }

    try {
        const userExists = await UserRepository(prisma).getUserByEmail(email)
        if (!(userExists instanceof Error)) {
            if (!userExists.verified) {
                const verificationResult = await sendVerificationToken({
                    email,
                    userId: userExists.id,
                    name: firstName.charAt(0).toUpperCase() + firstName.slice(1)
                })
                if (verificationResult instanceof Error) {
                    return new Response(
                        JSON.stringify({ error: verificationResult.message }),
                        {
                            status: 500
                        }
                    )
                }
                return new Response(
                    JSON.stringify({ error: "User not verified." }),
                    {
                        status: 403
                    }
                )
            }

            return new Response(
                JSON.stringify({ error: "User already exists" }),
                {
                    status: 409
                }
            )
        }

        await prisma.$transaction(async (prisma) => {
            const hashedPassword = await createPassword(password)
            const user = await UserRepository(prisma).create({
                email: email.trim().toLowerCase(),
                name: `${firstName.trim().toLowerCase()} ${lastName.trim().toLowerCase()} ${middleName.trim().toLowerCase()}`,
                password: hashedPassword,
                verified: false
            })
            if (user instanceof Error) {
                throw new Error(user.message)
            }
            const account = await AccountRepository(prisma).create({
                accountName: "",
                accountNumber: "",
                bankCode: "",
                userEmail: email,
                lnAddress: "",
                userId: 0,
                user: {
                    connect: { email: email }
                }
            })
            if (account instanceof Error) {
                throw new Error(account.message)
            }
            const kyc = await KYCRepository(prisma).create({
                bvn: "",
                userEmail: email,
                user: {
                    connect: { email: email }
                },
                userId: 0
            })
            if (kyc instanceof Error) {
                throw new Error(kyc.message)
            }
        })

        const user = await UserRepository(prisma).getUserByEmail(email)
        if (user instanceof Error) {
            throw new Error(user.message)
        }
        const updatedAccount = await AccountRepository(prisma).updateAccount({
            account: {
                userId: user.id
            },
            userEmail: email
        })
        if (updatedAccount instanceof Error) {
            throw new Error(updatedAccount.message)
        }
        const updatedKyc = await KYCRepository(prisma).updateKYC({
            kyc: {
                userId: user.id
            },
            userEmail: email
        })
        if (updatedKyc instanceof Error) {
            throw new Error(updatedKyc.message)
        }

        const verificationResult = await sendVerificationToken({
            email,
            userId: user.id,
            name: firstName.charAt(0).toUpperCase() + firstName.slice(1)
        })
        if (verificationResult instanceof Error) {
            throw verificationResult
        }

        return new Response(JSON.stringify({ message: "user created!" }), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.error(error)

        return new Response(
            JSON.stringify({
                error: "An error occurred while creating user account"
            }),
            {
                status: 500
            }
        )
    }
}
