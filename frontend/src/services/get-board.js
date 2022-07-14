import axios from "axios";
import { axiosInstance } from "./axios-instance";

export const getBoard = async () => {
  try {
    const {
      data: { data: profiles },
    } = await axiosInstance.get("/board");

    return {
      profiles,
    };
  } catch (error) {
    const errorSummary = error?.response?.data ?? { message: error.message };

    return {
      error: errorSummary,
    };
  }
};
