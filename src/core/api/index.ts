import axios from "axios";
import { ENV } from "../constants/env";
import { getAuthToken, clearAuthStorage } from "../storage/auth.storage";
import { authUserStore } from "../../modules/auth/store/auth.store";

export const api = axios.create({ baseURL: ENV.API_BASE_URL, timeout: 15_000 });

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearAuthStorage();
      authUserStore.value = null;
    }
    return Promise.reject(err);
  },
);
