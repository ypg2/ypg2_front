import { User } from "../models/user.model";
import { authInstance, defaultInstance } from "./http";

const login = async (data: User) => {
  const response = await authInstance.post("/users/log-in", data);
  const { message } = response.data;
  const jwt = response.headers["authorization"];
  return { message: message, jwt: jwt };
};

const join = async (data: User) => {
  const response = await defaultInstance.post("/users/sign-up", data);
  return response.data;
};

const fetchResetRequest = async (data: User) => {
  const response = await defaultInstance.post("/users/reset-password", data);
  return response.data;
};

const fetchResetPW = async (data: User) => {
  const response = await defaultInstance.put("/users/reset-password", data);
  return response.data;
};

export { login, join, fetchResetRequest, fetchResetPW };
