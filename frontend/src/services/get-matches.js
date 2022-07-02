import { axiosInstance } from "./axios-instance";

export const getMatches = async () => {
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/matches");

    const profilePromises = data.map(async (match) => {
      const {
        data: { data: profiles },
      } = await axiosInstance.get(`profiles/${match.targetAccountId}`);

      return profiles;
    });

    const profiles = await Promise.all(profilePromises);

    return {
      matches: profiles,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
