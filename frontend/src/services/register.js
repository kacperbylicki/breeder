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
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
