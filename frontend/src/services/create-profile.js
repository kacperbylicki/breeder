import { axiosInstance } from "./axios-instance";

export const createProfile = async (payload) => {
  try {
    const {
      data: { data },
    } = await axiosInstance.post("/profiles", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      profile: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
