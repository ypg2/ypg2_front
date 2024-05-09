import { defaultInstance } from "./http";

export const fetchCategory = async () => {
  try {
    const response = await defaultInstance.get(`/categories`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
