import { useState } from "react"

export const useForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const forgotPassword = async (email: string) => {
        if (!email) {
            setError("Please enter a valid email address")
            return
        }
        setLoading(true)
        setError(null)
        setMessage(null)
        try {
            const res = await fetch("/api/forgot-password/init-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            if (res.status !== 200 || !res.ok) {
                const err = await res.json()
                throw new Error(err.error || "An error occurred")
            }
            const data = await res.json()
            setSuccess(true)
            setMessage(data.message)
        } catch (error: any) {
            setError(
                `${error instanceof Error ? error.message : "Password reset failed. Please try again."}`
            )
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, success, message, forgotPassword }
}
