import { axiosInstance } from "./axios-instance";

export const getReactions = async (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data },
    } = await axiosInstance.get("/reactions");

    return {
      reactions: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
