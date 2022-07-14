import { axiosInstance } from "./axios-instance";

export const createReaction = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/reactions", payload);

    return {
      reaction: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
