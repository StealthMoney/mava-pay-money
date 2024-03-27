import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const useToast = () => {
    const showToast = (message: string, type: "error" | "success") => {
        if (type === "error") {
            toast.error(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        } else {
            toast.success(message, {
                autoClose: 5000,
                position: "bottom-right"
            })
        }
    }

    return { showToast }
}
