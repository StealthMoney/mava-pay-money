import { API_DOMAIN } from "@/config/process"

export const getBaseUrl = () => {
    return process.env.VERCEL_ENV === "production"
        ? API_DOMAIN
        : process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000"
}

export const generateUserRef = (name: string) => {
    const ref = `BVNIDV-${name.trim()}-${new Date().getTime()}`
    // TODO: check if ref exists in db
    // if exists, generate another ref
    return ref
}
