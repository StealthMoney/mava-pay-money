import {
    LN_ADDRESS_REGEX,
    MAX_SPENDABLE,
    MIN_SPENDABLE
} from "@/config/default"
import { ValidationError } from "../error"
import { milliSatsToSats } from "@/utils/conversion"

export const validateLNAddress = (lnAddress?: string) => {
    let message = ""
    if (!lnAddress) {
        message = "No address provided"
        return new ValidationError(message)
    }

    if (LN_ADDRESS_REGEX.test(lnAddress)) {
        return {
            address: lnAddress,
            addressName: lnAddress
        }
    } else {
        message = "Invalid address"
        return new ValidationError(message)
    }
}

export const validateAmount = (amount: any) => {
    let message = ""
    if (!amount) {
        message = "No amount provided"
        return new ValidationError(message)
    }
    if (!parseInt(amount)) {
        message = "Amount is invalid"
        return new ValidationError(message)
    }

    const amount_number = Number(amount)
    if (amount_number < MIN_SPENDABLE) {
        message = "Amount provided is less than min spendable amount"
        return new ValidationError(message)
    }
    if (amount_number > MAX_SPENDABLE) {
        message = "Amount provided is more than max spendable amount"
        return new ValidationError(message)
    }
    return amount_number
}

export const validateFees = (fees: any) => {
    let message = ""

    if (!fees) return undefined

    if (isNaN(Number(fees))) {
        message = "Fee is invalid"
        return new ValidationError(message)
    }
    return milliSatsToSats(Number(fees))
}
