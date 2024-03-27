import { getProfile } from "@/app/profile/getProfile"
import { Profile } from "@/types/profile"
import { useState, useEffect } from "react"

const useProfile = () => {
    const [profile, setProfile] = useState<Profile>({} as Profile)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            setError("")
            setLoading(true)
            try {
                const response = await getProfile()
                if (response.error || !response.data) {
                    throw new Error(
                        "An error occurred. Please try again later."
                    )
                }
                const { data } = response
                const formattedProfile = {
                    ...data,
                    lnAddress: data.user.lnAddress?.address || "",
                    user: {
                        ...data.user,
                        email: data.user.email,
                        firstName: formatName(data.user.name.split(" ")[0]),
                        lastName: formatName(data.user.name.split(" ")[1]),
                        middleName: formatName(data.user.name.split(" ")[2]),
                        kycInfo: {
                            ...data.user.kycInfo,
                            bvn: data.user.kycInfo?.bvn || undefined,
                            status: data.user.kycInfo?.status || undefined
                        }
                    }
                }
                setProfile(formattedProfile)
            } catch (e: any) {
                setError(
                    e.message || "An error occurred. Please try again later."
                )
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    function formatName(name: string) {
        if (!name) return ""
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    }

    return { profile, loading, error }
}

export default useProfile
