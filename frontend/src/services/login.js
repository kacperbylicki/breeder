import { axiosInstance } from "./axios-instance";

export const loginAccount = async (payload) => {
  try {
    const {
      data: {
        data: { tokens, account },
      },
    } = await axiosInstance.post("/accounts/login", payload);

    return {
      ...tokens,
      ...account,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
