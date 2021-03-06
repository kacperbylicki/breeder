import { axiosInstance } from "./axios-instance";

export const refreshTokens = async (refreshToken) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/accounts/refresh-token", { refreshToken });

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
