import { LN_ADDRESS_REGEX } from "@/config/default"
import { ValidationError } from "../error"
import { MAVAPAY_MONEY_DOMAIN, isDev } from "@/config/process"

export const validateLNAddress = (lnAddress?: string) => {
  let message = ""
  if (!lnAddress) {
    message = "No address provided"
    return new ValidationError(message)
  }

  const path = lnAddress.split("@")
  const username = path[0]
  const domain = path[1]

  if (!domain) {
    message = "Invalid address"
    return new ValidationError(message)
  }
  if (!isDev) {
    if (domain !== MAVAPAY_MONEY_DOMAIN)
    message = "Invalid domain"
    return new ValidationError(message)
  }

  if (LN_ADDRESS_REGEX.test(username)) {
    return lnAddress
  } else {
    message = "Invalid address"
    return new ValidationError(message)
  }
}
