import axios from "axios";
import { axiosInstance } from "./axios-instance";

export const getBoard = async (accessToken) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  try {
    const {
      data: { data: profiles },
    } = await axiosInstance.get("/board");

    const profileWithAvatarPromises = profiles.map(async (profile) => {
      const {
        data: { message: avatar },
      } = await axios.get("https://dog.ceo/api/breeds/image/random");

      return {
        ...profile,
        avatar,
      };
    });

    const profilesWithAvatars = await Promise.all(profileWithAvatarPromises);

    return {
      profiles: profilesWithAvatars,
    };
  } catch (error) {
    return {
      error: error?.response?.data,
    };
  }
};
