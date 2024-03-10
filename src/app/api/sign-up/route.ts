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

    const userExists = await UserRepository(prisma).getUserByEmail(email)
    if (!(userExists instanceof Error)) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
            status: 400
        })
    }

    try {
        const result = prisma.$transaction(async (prisma) => {
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
                userId: user.id,
                lnAddress: "",
                user: {
                    connect: { id: user.id }
                }
            })
            if (account instanceof Error) {
                throw new Error(account.message)
            }
            const kyc = await KYCRepository(prisma).create({
                bvn: "",
                userId: user.id,
                user: {
                    connect: { id: user.id }
                }
            })
            if (kyc instanceof Error) {
                throw new Error(kyc.message)
            }

            const result = await sendVerificationToken({
                email,
                userId: user.id,
                prisma: prisma
            })

            if (result instanceof Error) {
                throw result
            }

            return result
        })

        if (!(await result).token || result instanceof Error) {
            throw new Error("An error occurred while creating user and account")
        } else {
            return new Response(JSON.stringify({ message: "user created!" }), {
                status: 201,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    } catch (error) {
        console.error(error)
        return new Response(
            JSON.stringify({
                error: "An error occurred while creating user and account"
            }),
            {
                status: 500
            }
        )
    }
}
