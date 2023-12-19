import { ValidationError } from "@/domain/error"

export const milliSatsToSats = (milliSats: any) => {
  let value = milliSats
  if (typeof milliSats === "string") {
    try {
      const millisats_number = parseInt(milliSats)
      if (typeof millisats_number === "number") {
        value = millisats_number
      } else throw new Error("value cannot be converted to a number")
    } catch (err: any) {
      const errMessage = err?.message ?? "value cannot be converted to a number"
      return new ValidationError(errMessage)
    }
  }
  if (typeof value !== "number") {
    return new ValidationError("value is not a number")
  }
  const sats = milliSats/1000
  return sats
}