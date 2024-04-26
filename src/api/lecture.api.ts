import { defaultInstance } from "./http";
import { Lecture } from "../models/lecture.model";
interface FetchLecturesParams {
  categoryID: string | null;
  page: string | null;
  limit: string | null;
}

export const fetchLectures = async (params: FetchLecturesParams) => {
  const response = await defaultInstance.get(`/lectures`, {
    params: params,
  });
  return response.data;
};

export const fetchLectureDetail = async (id: number) => {
  const response = await defaultInstance.get<Lecture[]>(`/lectures/${id}`);
  return response.data[0];
};
