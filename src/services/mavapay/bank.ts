import axiosInstance from "../rest/axios";

export const getBankCode = async () => {
  try {
    const res = await axiosInstance.get("bank-code");
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error: any) {
    console.log(error.response);
    return { success: false, message: error.response.data.message };
  }
};

export const getAccountName = async (
  accountNumber: string,
  bankCode: string
) => {
  try {
    const res = await axiosInstance.get(
      `account-name?accountNumber=${accountNumber}&bankCode=${bankCode}`
    );
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error: any) {
    console.log(error.response);
    return { success: false, message: error.response.data.message };
  }
};
