import { defaultInstance } from "./http";

export const fetchLectureDetail = async (id: number) => {
  const response = await defaultInstance.get(`/lectures/${id}`);
  return response.data.data;
};
