import axios from "axios";
import { ENV } from "../constants/env";
import { getAuthToken } from "../storage/auth.storage";

export const api = axios.create({ baseURL: ENV.API_BASE_URL, timeout: 15_000 });

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
