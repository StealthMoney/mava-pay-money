import { config } from "dotenv"
import { ConfigError } from "./errors"

config()

export const MAVAPAY_URL =
    process.env.MAVAPAY_URL ?? process.env.NEXT_PUBLIC_MAVAPAY_URL ?? ""
export const MAVAPAY_API_KEY =
    process.env.MAVAPAY_API_KEY ?? process.env.NEXT_PUBLIC_MAVAPAY_API_KEY ?? ""
export const MAVAPAY_MONEY_DOMAIN =
    process.env.NEXT_PUBLIC_MAVAPAY_MONEY_DOMAIN ??
    process.env.MAVAPAY_MONEY_DOMAIN ??
    ""

// TODO: fix regression in managing multiple domains by removing suffix in address
export const API_DOMAIN =
    process.env.NEXT_PUBLIC_API_DOMAIN ?? process.env.API_DOMAIN ?? ""
export const isProd = process.env.NODE_ENV === "production"
export const isDev = process.env.NODE_ENV === "development"
export const SENDGRID_API_KEY =
    process.env.NEXT_PUBLIC_SENDGRID_API_KEY ??
    process.env.SENDGRID_API_KEY ??
    ""
export const JWT_SECRET_KEY = Buffer.from(
    process.env.NEXT_PUBLIC_JWT_SECRET ?? process.env.JWT_SECRET ?? "",
    "base64"
)
export const VERIFICATION_URL =
    process.env.NEXT_PUBLIC_VERIFICATION_URL ??
    process.env.VERIFICATION_URL ??
    ""
export const EMAIL_VERIFY_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAIL_VERIFY_TEMPLATE_ID ??
    process.env.EMAIL_VERIFY_TEMPLATE_ID ??
    ""
export const JWT_SECRET =
    process.env.NEXT_PUBLIC_JWT_SECRET ?? process.env.JWT_SECRET ?? ""
export const PRIVATE_KEY =
    process.env.NEXT_PUBLIC_PRIVATE_KEY ?? process.env.PRIVATE_KEY ?? ""
export const PUBLIC_KEY =
    process.env.NEXT_PUBLIC_PUBLIC_KEY ?? process.env.PUBLIC_KEY ?? ""
export const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ??
    process.env.EMAILJS_PUBLIC_KEY ??
    ""
export const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ??
    process.env.PUBLIC_EMAILJS_SERVICE_ID ??
    ""
export const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID ??
    ""
export const MAVAPAY_SUPPORT_EMAIL =
    process.env.NEXT_PUBLIC_MAVAPAY_SUPPORT_EMAIL ??
    process.env.MAVAPAY_SUPPORT_EMAIL ??
    ""

if (!MAVAPAY_URL) {
    throw new ConfigError("MAVAPAY_URL not found")
}
if (!MAVAPAY_API_KEY) {
    throw new ConfigError("MAVAPAY_API_KEY not found")
}
if (!MAVAPAY_MONEY_DOMAIN) {
    throw new ConfigError("MAVAPAY_MONEY_DOMAIN not found")
}
if (!API_DOMAIN) {
    throw new ConfigError("API_DOMAIN not found")
}
if (!JWT_SECRET) {
    throw new ConfigError("JWT_SECRET not found")
}
if (!PRIVATE_KEY) {
    throw new ConfigError("PRIVATE_KEY not found")
}
