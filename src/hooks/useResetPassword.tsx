import { useRouter } from "next/navigation"
import { useState } from "react"

export const useResetPassword = () => {
    const [resetPassword, setResetPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const resetPasswordRequest = async ({
        token,
        password,
        confirmPassword
    }: {
        token: string | null
        password: string
        confirmPassword: string
    }) => {
        if (!token || !password || !confirmPassword) {
            setError("Please fill all fields")
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            const res = await fetch("/api/forgot-password/finish-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, password })
            })
            if (res.status !== 200 || !res.ok) {
                const err = await res.json()
                throw new Error(err.error || "An error occurred")
            }
            const data = await res.json()
            setResetPassword(true)
            setMessage(data.message)
            setSuccess(true)
            // setTimeout(() => {
            //     router.push("/sign-in")
            // }, 3000)
        } catch (error: any) {
            setError(
                `${error instanceof Error ? error.message : "Password reset failed. Please try again."}`
            )
        } finally {
            setLoading(false)
        }
    }

    return {
        resetPassword,
        loading,
        error,
        message,
        success,
        resetPasswordRequest
    }
}
