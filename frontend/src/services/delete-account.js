import { axiosInstance } from "./axios-instance";

export const deleteAccount = async (payload) => {
  try {
    await axiosInstance.delete(`/accounts/${payload.accountId}`, payload);

    return {};
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
