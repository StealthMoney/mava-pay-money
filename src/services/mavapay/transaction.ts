import { Transaction } from "@/types/transaction";
import axiosInstance from "../rest/axios";

export const getTxnByOrderId = async (orderId: string) => {
  try {
    const res = await axiosInstance.get<{status: string, data: Transaction[]}>(`transaction?orderId=${orderId}`);
    console.log(res.data)
    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.log(error.response);
    return { success: false, message: error.response.data.message };
  }
};