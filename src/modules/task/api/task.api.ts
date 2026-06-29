import type { PaginatedResult } from "@/core/interfaces";
import { api } from "../../../core/api";
import type {
  CreateTaskApiResponse,
  CreateTaskDto,
  FetchTaskByIdApiResponse,
  FetchTasksApiResponse,
  ListTaskParams,
  UpdateTaskDto,
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

export const fetchTaskByIdApi = async (id: string) => {
  const response = await api.get<ApiResponse<FetchTaskByIdApiResponse>>(
    `/tasks/${id}`,
  );
  return unwrapApiResponse(response);
};

export const updateTaskApi = async (id: string, payload: UpdateTaskDto) => {
  const response = await api.patch<ApiResponse<FetchTaskByIdApiResponse>>(
    `/tasks/${id}`,
    payload,
  );
  return unwrapApiResponse(response);
};


