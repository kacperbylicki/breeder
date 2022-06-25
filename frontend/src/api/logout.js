import { axiosInstance } from "./axios-instance";

export const logoutAccount = async (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    await axiosInstance.post("/accounts/logout");

    return {};
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
