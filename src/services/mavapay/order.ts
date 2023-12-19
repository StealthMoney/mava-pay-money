import axiosInstance from "../rest/axios";

export const getOrderById = async (orderId: string) => {
  try {
    const res = await axiosInstance.get(`order?id=${orderId}`);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.error(error.response);
    return { success: false, message: error.response.data.message };
  }
};