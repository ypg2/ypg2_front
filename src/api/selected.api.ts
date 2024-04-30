import { authInstance } from "./http";

export const fetchGetSelected = async () => {
  const response = await authInstance.get(`/selected-lectures`);
  if (response) {
    return response.data.data;
  }
  return [];
};

export const fetchPostSelected = async (id: number) => {
  const response = await authInstance.post(`/selected-lectures/${id}`);
  return response.data;
};

export const fetchDeleteSelected = async (id: number) => {
  const response = await authInstance.delete(`/selected-lectures/${id}`);
  return response.data;
};
