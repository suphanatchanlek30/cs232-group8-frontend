import axios, { AxiosError } from "axios";

import {
  clearReporterTokens,
  getReporterAccessToken,
} from "@/services/auth/token-storage";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL?.trim(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getReporterAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearReporterTokens();
    }

    return Promise.reject(error);
  }
);

export default apiClient;