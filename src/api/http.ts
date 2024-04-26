import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

// ec2-13-209-84-47.ap-northeast-2.compute.amazonaws.com:3001/
export const BASE_URL = "http://localhost:3001/api";
const DEFAULT_TIMEOUT = 20000;
const accessToken = "Access-Token";

const createDefaultInstance = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
    ...config,
  });
  return axiosInstance;
};

const defaultInstance = createDefaultInstance();
const authInstance = createDefaultInstance({
  headers: {
    Authorization: getToken() ? getToken() : "",
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 오류 났을때의 대처
      removeToken();
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
);

export { defaultInstance, authInstance };
