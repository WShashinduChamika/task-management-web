import { api } from "../../../core/api";
import type { AuthApiResponse, RegisterDto } from "../types";

export const registerApi = (payload: RegisterDto) => 
    api.post<AuthApiResponse>("/auth/register", payload);