import { User } from "../models/user.model";
import { authInstance, defaultInstance } from "./http";

const login = async (data: User) => {
  const response = await authInstance.post("/users/login", data);
  return response.data;
};

const join = async (data: User) => {
  const response = await defaultInstance.post("/users/join", data);
  return response.data;
};

export { login, join };
