import { authInstance } from "./http";

export const fetchScheduledLectures = async () => {
  try {
    const response = await authInstance.get(`/scheduled-lectures`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
