import { api } from "@/core/api";
import { unwrapApiResponse } from "@/core/api/response";
import type { FetchUserResponse } from "../types";
import type { ApiResponse } from "@/core/api/types";

export const fetchActiveUsersApi = async () => {
  const response =
    await api.get<ApiResponse<FetchUserResponse[]>>("/users/active");
  return unwrapApiResponse(response);
};
