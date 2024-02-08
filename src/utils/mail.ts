import crypto from "crypto"

export function generateEmailToken() {
    const randomBytes = crypto.randomBytes(32).toString("hex")
    return randomBytes
}
