import { axiosInstance } from "./axios-instance";

export const getBreeds = async (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data },
    } = await axiosInstance.get("/breeds");

    return {
      breeds: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
