export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/profile", "/get-address", "/create-address", "/kyc"]
}
