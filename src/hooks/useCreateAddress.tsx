import { signOut, useSession } from "next-auth/react"
import { useState } from "react"

import { createAddress } from "@/app/create-address/create-address"

export const useCreateAddress = () => {
    const { data } = useSession()

    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [isAddressCreated, setIsAddressCreated] = useState(false)

    const email = data?.user.email
    if (!email) signOut()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { value } = event.target
        setUsername(value)
    }

    const handleCreateAddress = async () => {
        if (!username) {
            setError("username is required")
            return
        }
        // check if there are special characters and throw an error
        if (username.match(/[^a-zA-Z0-9]/)) {
            setError(
                "Username should only contain letters and numbers. No special characters"
            )
            return
        }
        const formatedUsername =
            `${username.trim()}@mavapay.money`.toLowerCase()
        setLoading(true)
        const usernameRes = await createAddress(email!, formatedUsername)
        setLoading(false)
        if (error || !usernameRes.data) {
            setError(
                usernameRes.error || "An error occurred. Please try again later"
            )
            return
        }
        setUsername(usernameRes.data?.address)
        setIsAddressCreated(true)
    }

    return {
        username: username?.toLowerCase(),
        isAddressCreated,
        loading,
        error,
        setUsername,
        handleCreateAddress,
        handleInputChange
    }
}
