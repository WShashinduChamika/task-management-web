import type { PaginatedResult } from "@/core/interfaces";
import { api } from "../../../core/api";
import type {
  CreateTaskApiResponse,
  CreateTaskDto,
  FetchTasksApiResponse,
  ListTaskParams,
} from "../types";
import type { ApiResponse } from "@/core/api/types";
import { unwrapApiResponse } from "@/core/api/response";

export const createTaskApi = (payload: CreateTaskDto) =>
  api.post<ApiResponse<CreateTaskApiResponse>>("/tasks", payload);

export const fetchTasksApi = async (params: ListTaskParams) => {
  const response = await api.get<
    ApiResponse<PaginatedResult<FetchTasksApiResponse>>
  >("/tasks", { params });
  return unwrapApiResponse(response);
};
