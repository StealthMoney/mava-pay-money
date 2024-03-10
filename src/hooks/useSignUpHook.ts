import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { IUserSignIn } from "@/types/user"

export const useSignUpHook = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [checked, setChecked] = useState(false)
    const [isUserCreated, setIsUserCreated] = useState(false)
    const [form, setForm] = useState<IUserSignIn>({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        password: ""
    })

    useEffect(() => {
        if (form.password.length && confirmPassword !== form.password) {
            setPasswordError("Oops!, it seems both passwords don't match")
        } else if (
            form.password.length &&
            form.password.length < 8 &&
            confirmPassword.length < 8
        ) {
            setPasswordError(
                "Your password must have a minimum of 8 characters"
            )
        } else {
            setPasswordError("")
        }
    }, [confirmPassword, passwordError, form.password])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleConfirmPasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault()
        const { value } = event.target
        setConfirmPassword(value)
    }

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.persist()
        const { checked } = event.target
        setChecked(checked)
    }

    const handleUserSignup = async () => {
        setLoading(true)

        if (validateSignup(form, setLoading) === false) {
            setLoading(false)
            return
        }

        try {
            const res = await fetch("/api/sign-up", {
                method: "POST",
                body: JSON.stringify(form)
            })

            console.log({ res })
            if (res instanceof Error) {
                throw res
            }

            if (res.status === 201 || res.ok) {
                setIsUserCreated(true)
                router.push("/confirm-email")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
            setError(
                "An error occurred while creating user and account, please try again"
            )
        } finally {
            setLoading(false)
        }
    }

    function validateSignup(
        form: IUserSignIn,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ): boolean {
        if (form.firstName === "") {
            setError("First name is required")
            setLoading(false)
            return false
        } else if (form.lastName === "") {
            setError("Last name is required")
            setLoading(false)
            return false
        } else if (
            form.email === "" ||
            !form.email.includes("@") ||
            !form.email.includes(".")
        ) {
            setError("Please provide an email address")
            setLoading(false)
            return false
        } else if (
            form.password !== confirmPassword ||
            form.password.length === 0 ||
            confirmPassword.length === 0
        ) {
            setPasswordError("Oops!, it seems both passwords don't match")
            setError("Your passwords might be empty or do not match")
            setLoading(false)
            return false
        } else if (checked === false) {
            setError("Please agree to the terms and conditions")
            setLoading(false)
            return false
        } else if (
            form.firstName.length ||
            form.lastName.length ||
            form.email.length
        ) {
            setError("")
        } else {
            setError("")
        }
        return true
    }

    return {
        form,
        checked,
        confirmPassword,
        setConfirmPassword,
        isUserCreated,
        error,
        passwordError,
        loading,
        handleInputChange,
        handleConfirmPasswordChange,
        handleCheckboxChange,
        handleUserSignup
    }
}
