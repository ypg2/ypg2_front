import { authInstance } from "./http";

export const fetchScheduledLectures = async () => {
  const response = await authInstance.get(`/scheduled-lectures`);
  if (response) {
    return response.data;
  }
  return [];
};
