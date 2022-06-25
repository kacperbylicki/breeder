import { axiosInstance } from "./axios-instance";

export const getMatches = async (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data },
    } = await axiosInstance.get("/matches");

    return {
      matches: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
