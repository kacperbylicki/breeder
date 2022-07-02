import { axiosInstance } from "./axios-instance";

export const getCurrentUser = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/accounts/me");

    return {
      account: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
