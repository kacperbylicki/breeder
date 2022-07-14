import { axiosInstance } from "./axios-instance";

export const getCurrentUser = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/accounts/me");

    return {
      ...data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
