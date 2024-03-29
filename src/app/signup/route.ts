import { API_DOMAIN, EMAIL_VERIFY_TEMPLATE_ID } from "@/config/process"
import { prisma } from "@/lib/prisma"
import { sendMail } from "@/services/mail/sendgrid"
import {
    UserRepository,
    VerificationRepository
} from "@/services/prisma/repository"
import { generateEmailToken } from "@/utils/mail"
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
                email,
                name: `${firstName} ${lastName} ${middleName}`,
                password: hashedPassword,
                verified: false
            })
            if (user instanceof Error) {
                throw new Error(user.message)
            }

            const token = generateEmailToken()
            const verification = await VerificationRepository(prisma).create({
                user: {
                    connect: { id: user.id }
                },
                token,
                userId: user.id
            })
            if (verification instanceof Error) {
                throw new Error(verification.message)
            }

            const verificationUrl = `${API_DOMAIN}/account/verify?key=${token}`
            const mail = await sendMail({
                from: "donotreply@mavapay.co",
                to: email,
                templateId: EMAIL_VERIFY_TEMPLATE_ID,
                dynamicTemplateData: {
                    url: verificationUrl
                }
            })
            if (mail instanceof Error) {
                throw new Error(mail.message)
            }

            return verification
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
