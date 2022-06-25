import { axiosInstance } from "./axios-instance";

export const registerAccount = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/accounts/register", payload);

    return {
      account: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
