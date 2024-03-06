import { PRIVATE_KEY, PUBLIC_KEY } from "@/config/process"
import * as crypto from "crypto"

export function validateDigitalSignature(
    data: string,
    receivedSignature: string
) {
    const verify = crypto.createVerify("sha256")
    verify.update(data)
    return verify.verify(PUBLIC_KEY, receivedSignature, "base64")
}

export const generateDigitalSignature = (data: string) => {
    const sign = crypto.createSign("sha256")
    sign.update(data)
    return sign.sign(PRIVATE_KEY, "base64")
}
