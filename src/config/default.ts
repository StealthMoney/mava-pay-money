export const LN_ADDRESS_REGEX = /^[a-z0-9\-_\.]+$/i

export const MAX_SPENDABLE = 1_000_000_000 // 1,000,000 sats
export const MIN_SPENDABLE = 1_500_000 // 1,500 sats

export const PARTNER_QUERY = "partner"
export const AUTH_HEADER = "x-authorization-key"
export const SIGNATURE_HEADER = "X-Mavapay-Money-Signature"

export const WEBHOOK_RETRIES = 3
export const DELAY_BETWEEN_RETRIES_IN_SECONDS = 2

export const SALT_ROUNDS = 12
export const TOKEN_EXPIRY = 1000 // 1000 seconds (15 minutes)

export const ACCOUNT_NUMBER_LENGTH = 10
export const BVN_LENGTH = 11
