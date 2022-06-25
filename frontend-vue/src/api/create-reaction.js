import { axiosInstance } from "./axios-instance";

export const createReaction = async (payload, accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data },
    } = await axiosInstance.post("/reactions", payload);

    return {
      reaction: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
