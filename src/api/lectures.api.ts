import { Lecture } from "../models/lecture.model";
import { defaultInstance } from "./http";

export const fetchLectureDetail = async (id: number) => {
  const response = await defaultInstance.get<Lecture[]>(`/lectures/${id}`);
  return response.data[0];
};
