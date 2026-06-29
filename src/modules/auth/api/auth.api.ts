import { api } from "../../../core/api";
import type { AuthApiResponse, LoginDto, RegisterDto } from "../types";

export const registerApi = (payload: RegisterDto) =>
  api.post<AuthApiResponse>("/auth/register", payload);

export const loginApi = (payload: LoginDto) =>
  api.post<AuthApiResponse>("/auth/login", payload);

export const logoutApi = () => api.post("/auth/logout");
