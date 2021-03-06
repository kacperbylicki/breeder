import { axiosInstance } from "./axios-instance";

export const getReactions = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/reactions");

    return {
      reactions: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
