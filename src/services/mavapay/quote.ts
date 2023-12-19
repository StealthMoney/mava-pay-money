import { Quote, acceptQuoteProps } from "@/types/quote";
import axiosInstance from "../rest/axios";
import { Order } from "@/types/order";

export const getQuote = async ({ amount }: { amount: number }) => {
  const data = {
    amount,
    sourceCurrency: "BTC",
    targetCurrency: "NGN",
    paymentMethod: "LIGHTNING",
  };
  try {
    const res = await axiosInstance.post("quote", data);
    return { success: true, data: res.data.data as Quote["data"] };
  } catch (error: any) {
    console.error(error.response);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const acceptQuote = async ({
  id,
  bankAccountNumber,
  bankAccountName,
  bankCode,
  descriptionHash,
  memo
}: acceptQuoteProps) => {
  "use server";
  const params = new URLSearchParams()
  params.append("autopayout", "true")
  params.append("id", id)
  params.append("bankAccountNumber", bankAccountNumber)
  params.append("bankAccountName", bankAccountName)
  params.append("bankCode", bankCode)
  params.append("descriptionHash", descriptionHash)
  if (memo) {
    params.append("memo", memo)
  }

  const queryParams = params.toString()
  try {
    const res = await axiosInstance.get(`quote/accept?${queryParams}`);
    return { success: true, data: res.data.data as Order };
  } catch (error: any) {
    return { success: false, message: error.response.data.message };
  }
};