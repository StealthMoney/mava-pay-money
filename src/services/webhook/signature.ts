import { PRIVATE_KEY, PUBLIC_KEY } from "@/config/process"
import * as crypto from "crypto"

export function validateDigitalSignature(
    data: string,
    receivedSignature: string
) {
    const publicKey = Buffer.from(PUBLIC_KEY, "base64")
    const verify = crypto.createVerify("sha256")
    verify.update(data)
    return verify.verify(publicKey, receivedSignature, "base64")
}

export const generateDigitalSignature = (data: string) => {
    const privateKey = Buffer.from(PRIVATE_KEY, "base64")
    const sign = crypto.createSign("sha256")
    sign.update(data)
    return sign.sign(privateKey, "base64")
}
