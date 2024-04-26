import { defaultInstance } from "./http";

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
