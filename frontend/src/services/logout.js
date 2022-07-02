import { axiosInstance } from "./axios-instance";

export const logoutAccount = async () => {
  try {
    await axiosInstance.post("/accounts/logout");

    return {};
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
