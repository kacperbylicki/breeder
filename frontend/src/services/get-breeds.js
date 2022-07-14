import { axiosInstance } from "./axios-instance";

export const getBreeds = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/breeds");

    return {
      breeds: data,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
