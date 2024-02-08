import { LN_ADDRESS_REGEX } from "@/config/default"
import { ValidationError } from "../error"

export * from "./validation"

export const randAddri = (lnAddress?: string) => {
    let message = ""
    if (!lnAddress) {
        message = "No address provided"
        return new ValidationError(message)
    }

    if (LN_ADDRESS_REGEX.test(lnAddress)) {
        return lnAddress
    } else {
        message = "Invalid address"
        return new ValidationError(message)
    }
}
