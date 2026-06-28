import { api } from "../../../core/api";
import type { CreateTaskApiResponse, CreateTaskDto } from "../types";

export const createTaskApi = (payload: CreateTaskDto) =>
  api.post<CreateTaskApiResponse>("/tasks", payload);
