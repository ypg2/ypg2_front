import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

export const BASE_URL =
  "http://ec2-13-209-84-47.ap-northeast-2.compute.amazonaws.com:3001/api";
const DEFAULT_TIMEOUT = 20000;

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
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeToken();
          window.location.href = "/login";
          break;
        case 404:
          return Promise.resolve({ data: [] });
        default:
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
          break;
      }
    } else {
      console.error("No response received from server");
    }
    return Promise.reject(error);
  }
);

export { defaultInstance, authInstance };
