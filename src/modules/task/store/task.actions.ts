import type {
  CreateTaskDto,
  ListTaskParams,
  TaskFilter,
  UpdateTaskDto,
} from "../types";
import {
  createTaskApi,
  fetchTasksApi,
  fetchTaskByIdApi,
  updateTaskApi,
  deleteTaskApi,
} from "../api/task.api";
import { getApiErrorMessage } from "../../../core/api/response";
import {
  taskFilterStore,
  taskCreateFormLoadingStore,
  taskCreateFormPanelOpenStore,
  taskCreateErrorStore,
  tasksDataStore,
  taskSearchStore,
  tasksLoadingStore,
  tasksErrorStore,
  taskPaginationStore,
  taskPaginationMetaStore,
  taskDetailStore,
  taskDetailLoadingStore,
  taskDetailErrorStore,
  taskUpdateFormPanelOpenStore,
  taskUpdateFormLoadingStore,
  taskUpdateErrorStore,
  taskDeleteDialogOpenStore,
  taskDeleteLoadingStore,
  taskDeleteErrorStore,
  taskToDeleteIdStore,
} from "./task.store";
import type { PaginationOptions } from "@/core/interfaces";

const buildListTaskParams = (): ListTaskParams => {
  const { page, limit, sortBy, sortOrder } = taskPaginationStore.value;
  return {
    page,
    limit,
    sortBy: sortBy as ListTaskParams["sortBy"],
    sortOrder: sortOrder as ListTaskParams["sortOrder"],
    search: taskSearchStore.value,
    priority: taskFilterStore.value.priority,
    status: taskFilterStore.value.status,
    createdBy: taskFilterStore.value.createdBy,
    assignedTo: taskFilterStore.value.assignedTo,
  };
};

export const setTaskFilterAction = (filter: TaskFilter): void => {
  taskFilterStore.value = filter;
  taskPaginationStore.value = { ...taskPaginationStore.value, page: 1 };
};

export const setTaskSearchAction = (query: string): void => {
  taskSearchStore.value = query;
  taskPaginationStore.value = { ...taskPaginationStore.value, page: 1 };
};

export const setTaskPaginationAction = (
  pagination: PaginationOptions,
): void => {
  taskPaginationStore.value = pagination;
};

export const resetTaskFilterAction = (): void => {
  taskFilterStore.value = {
    priority: null,
    status: null,
    createdBy: undefined,
    assignedTo: undefined,
  };
};

export const resetTaskSearchAction = (): void => {
  taskSearchStore.value = "";
};

export const resetTaskPaginationAction = (): void => {
  taskPaginationStore.value = {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };
};

export const openTaskCreateFormPanelAction = (): void => {
  taskCreateFormPanelOpenStore.value = true;
};

export const closeTaskCreateFormPanelAction = (): void => {
  taskCreateFormPanelOpenStore.value = false;
};

export const openTaskUpdateFormPanelAction = (): void => {
  taskUpdateFormPanelOpenStore.value = true;
};

export const closeTaskUpdateFormPanelAction = (): void => {
  taskUpdateFormPanelOpenStore.value = false;
};

export const openTaskDeleteDialogAction = (id: string): void => {
  taskToDeleteIdStore.value = id;
  taskDeleteDialogOpenStore.value = true;
};

export const closeTaskDeleteDialogAction = (): void => {
  taskDeleteDialogOpenStore.value = false;
  taskToDeleteIdStore.value = null;
  taskDeleteErrorStore.value = null;
};

export const createTaskAction = async (
  dto: CreateTaskDto,
): Promise<boolean> => {
  taskCreateFormLoadingStore.value = true;
  taskCreateErrorStore.value = null;

  try {
    await createTaskApi(dto);

    closeTaskCreateFormPanelAction();
    resetTaskFilterAction();
    resetTaskSearchAction();
    resetTaskPaginationAction();

    return true;
  } catch (error: any) {
    taskCreateErrorStore.value = getApiErrorMessage(
      error,
      "Unable to create task",
    );
    return false;
  } finally {
    taskCreateFormLoadingStore.value = false;
  }
};

export const fetchTasksAction = async () => {
  tasksLoadingStore.value = true;
  tasksErrorStore.value = null;

  const params = buildListTaskParams();

  try {
    const data = await fetchTasksApi(params);

    tasksDataStore.value = data.items;
    taskPaginationMetaStore.value = {
      total: data.total,
      page: data.page,
      limit: data.limit,
      totalPages: data.totalPages,
    };

    return true;
  } catch (error: any) {
    tasksErrorStore.value = getApiErrorMessage(error, "Unable to fetch tasks");
    return false;
  } finally {
    tasksLoadingStore.value = false;
  }
};

export const fetchTaskByIdAction = async (id: string): Promise<boolean> => {
  taskDetailLoadingStore.value = true;
  taskDetailErrorStore.value = null;

  try {
    const data = await fetchTaskByIdApi(id);
    taskDetailStore.value = data;
    return true;
  } catch (error: any) {
    taskDetailErrorStore.value = getApiErrorMessage(
      error,
      "Failed to load task",
    );
    taskDetailStore.value = null;
    return false;
  } finally {
    taskDetailLoadingStore.value = false;
  }
};

export const updateTaskAction = async (
  id: string,
  dto: UpdateTaskDto,
): Promise<boolean> => {
  taskUpdateFormLoadingStore.value = true;
  taskUpdateErrorStore.value = null;

  try {
    const updated = await updateTaskApi(id, dto);

    taskDetailStore.value = updated;

    closeTaskUpdateFormPanelAction();
    resetTaskFilterAction();
    resetTaskSearchAction();
    resetTaskPaginationAction();

    return true;
  } catch (error: any) {
    taskUpdateErrorStore.value = getApiErrorMessage(
      error,
      "Unable to update task",
    );
    return false;
  } finally {
    taskUpdateFormLoadingStore.value = false;
  }
};

export const deleteTaskAction = async (): Promise<boolean> => {
  const id = taskToDeleteIdStore.value;
  if (!id) return false;

  taskDeleteLoadingStore.value = true;
  taskDeleteErrorStore.value = null;

  try {
    await deleteTaskApi(id);

    tasksDataStore.value = tasksDataStore.value.filter((t) => t.id !== id);

    if (taskDetailStore.value?.id === id) {
      taskDetailStore.value = null;
    }

    closeTaskDeleteDialogAction();
    return true;
  } catch (error: any) {
    taskDeleteErrorStore.value = getApiErrorMessage(
      error,
      "Unable to delete task",
    );
    return false;
  } finally {
    taskDeleteLoadingStore.value = false;
  }
};
