import axios, { AxiosError } from "axios";

import {
  clearStaffTokens,
  getStaffAccessToken,
} from "@/services/auth/token-storage";

const staffApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL?.trim(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

staffApiClient.interceptors.request.use(
  (config) => {
    const token = getStaffAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

staffApiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      clearStaffTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/staff-portal-auth";
      }
    }

    return Promise.reject(error);
  }
);

export default staffApiClient;
