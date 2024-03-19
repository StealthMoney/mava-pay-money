import { IUserSignIn } from "@/types/user"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { getBaseUrl } from "@/utils"

export const useSignInHook = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") ?? "/profile"

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isUserCreated, setIsUserCreated] = useState(false)
    const [form, setForm] = useState<Pick<IUserSignIn, "email" | "password">>({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (form.password.length && form.password.length < 8) {
            setPasswordError(
                "Your password must have a minimum of 8 characters"
            )
        } else {
            setPasswordError("")
        }
    }, [passwordError, form.password])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleUserSignIn = async () => {
        setLoading(true)

        if (validateSignIn(form, setLoading) === false) {
            setLoading(false)
            return
        }

        try {
            const res = await signIn("credentials", {
                email: form.email.trim(),
                password: form.password.trim(),
                redirect: false,
                callbackUrl:
                    callbackUrl === `${getBaseUrl()}/get-address`
                        ? "/profile"
                        : callbackUrl
            })

            if (res && !res.ok) {
                if (res.status === 404) {
                    setError(
                        "You might want to check your login details, User not found"
                    )
                    setLoading(false)
                    return
                } else if (res.status === 403) {
                    setError(
                        "Account not verified! Please check your email to verify your account "
                    )
                    setLoading(false)
                    return
                } else if (res.status === 401) {
                    setError("We cannot find a user with this login details")
                    setLoading(false)
                    return
                } else {
                    setError(
                        "An error occurred while logging into your account"
                    )
                    setLoading(false)
                    return
                }
            }

            const route =
                res?.url === `${getBaseUrl()}/get-address`
                    ? "/profile"
                    : res?.url

            router.push(route!)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
            setError("An error occurred while logging into your account")
        } finally {
            setLoading(false)
        }
    }

    function checkSignInErrors(res: Response) {
        if (res.ok === false) {
            if (res.status === 404) {
                setError(
                    "You might want to check your login details, User not found"
                )
                return
            } else if (res.status === 403) {
                setError("Please check your mail to verify your account ")
                return
            } else if (res.status === 401) {
                setError("We cannot find a user with this login details ")

                return
            } else {
                setError("An error occurred while logging into your account")
            }

            setLoading(false)
            return true
        }
    }

    function validateSignIn(
        form: Pick<IUserSignIn, "email" | "password">,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ): boolean {
        if (
            form.email === "" ||
            !form.email.includes("@") ||
            !form.email.includes(".")
        ) {
            setError("Please provide an email address")
            setLoading(false)
            return false
        } else if (form.password.length < 8) {
            setError("Password must have a minimum of 8 characters")
            setLoading(false)
            return false
        } else {
            setError("")
        }
        return true
    }

    return {
        form,
        isUserCreated,
        error,
        passwordError,
        loading,
        handleInputChange,
        handleUserSignIn
    }
}
