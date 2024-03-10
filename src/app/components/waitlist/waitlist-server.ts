"use server"

import { prisma } from "@/lib/prisma"

export const addToWaitlist = async (email: string) => {
    // regex to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return {
            error: "Invalid email",
            success: false
        }
    }
    const emailExists = await prisma.waitlist.findUnique({
        where: {
            email
        }
    })
    if (emailExists) {
        return {
            error: "Email already exists in waitlist",
            success: false
        }
    }
    const waitlist = await prisma.waitlist.create({
        data: {
            email
        }
    })
    return {
        success: true,
        waitlist
    }
}
