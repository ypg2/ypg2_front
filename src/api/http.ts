import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://some-domain.com";
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
    Authorization: accessToken,
    // 실제 Token 값으로 변경필요
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = accessToken;
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
      return Promise.reject(error);
    }
  }
);

export { defaultInstance, authInstance };
