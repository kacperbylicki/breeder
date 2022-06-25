import { axiosInstance } from "./axios-instance";

export const updateProfile = async (payload, accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data },
    } = await axiosInstance.put("/profiles", payload);

    return {
      profile: data,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
