import { authInstance } from "./http";

export const fetchGetSelected = async () => {
  try {
    const response = await authInstance.get(`/selected-lectures`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const fetchPostSelected = async (id: number) => {
  const response = await authInstance.post(`/selected-lectures/${id}`);
  return response.data;
};

export const fetchDeleteSelected = async (id: number) => {
  const response = await authInstance.delete(`/selected-lectures/${id}`);
  return response.data;
};
