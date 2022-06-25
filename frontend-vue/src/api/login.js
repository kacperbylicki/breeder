import { axiosInstance } from "./axios-instance";

export const loginAccount = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/accounts/login", payload);

    return {
      ...data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
