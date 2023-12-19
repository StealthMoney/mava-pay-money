import { LN_ADDRESS_REGEX, MAX_SPENDABLE, MIN_SPENDABLE } from "@/config/default"
import { ValidationError } from "../error"
import { MAVAPAY_MONEY_DOMAIN, isDev } from "@/config/process"

export const validateLNAddress = (lnAddress?: string) => {
  let message = ""
  if (!lnAddress) {
    message = "No address provided"
    return new ValidationError(message)
  }

  // const path = lnAddress.split("@")
  // const username = path[0]
  // const domain = path[1]

  // if (!domain) {
  //   message = "Invalid address"
  //   return new ValidationError(message)
  // }
  // if (!isDev) {
  //   if (domain !== MAVAPAY_MONEY_DOMAIN)
  //   message = "Invalid domain"
  //   return new ValidationError(message)
  // }

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

  const ammount_number = Number(amount)
  if (ammount_number < MIN_SPENDABLE) {
    message = "Amount provided is less than min spendable amount"
    return new ValidationError(message)
  }
  if (ammount_number > MAX_SPENDABLE) {
    message = "Amount provided is more than max spendable amount"
    return new ValidationError(message)
  }
  return ammount_number
}
