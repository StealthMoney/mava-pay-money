import { UnauthorizedError } from "@/services/auth/error"

export type ValidateAuthHeaderResult =
    | {
          isValid: boolean
          isPartner: boolean
          partner?: string
      }
    | UnauthorizedError

export type JwtPayload = {
    sub: string
    name: string
    domain: string
}
