import { axiosInstance } from "./axios-instance";

export const updateProfile = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.put("/profiles", payload);

    return {
      profile: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
