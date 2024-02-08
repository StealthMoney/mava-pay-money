import { MAVAPAY_API_KEY, MAVAPAY_URL } from "@/config/process"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: MAVAPAY_URL
})

axiosInstance.interceptors.request.use(async (config) => {
    config.headers["x-api-key"] = MAVAPAY_API_KEY
    return config
})

export default axiosInstance
