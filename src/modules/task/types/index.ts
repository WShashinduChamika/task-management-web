export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Open" | "In Progress" | "Testing" | "Done";
export type TaskSortBy =
  | "createdAt"
  | "updatedAt"
  | "dueDate"
  | "title"
  | "priority"
  | "status";
export type TaskSortOrder = "asc" | "desc";

export interface UserRef {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  search?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface ListTaskParams {
  page?: number;
  limit?: number;
  sortBy?: TaskSortBy;
  sortOrder?: TaskSortOrder;
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  dueDate?: string;
}

export interface CreateTaskApiResponse extends Task {
  createdBy: string;
  assignTo: string;
}

export interface FetchTasksApiResponse extends Task {
  createdBy: UserRef;
  assignedTo: UserRef;
}

export type FetchTaskByIdApiResponse = FetchTasksApiResponse;

export interface ListTasksApiResponse {
  data: FetchTasksApiResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
