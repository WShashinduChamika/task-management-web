import { signal } from "@preact/signals-react";
import type { FetchTasksApiResponse, TaskFilter } from "../types";
import type { PaginationOptions } from "@/core/interfaces";

export const tasksDataStore = signal<FetchTasksApiResponse[]>([]);
export const tasksLoadingStore = signal(false);
export const tasksErrorStore = signal<string | null>(null);
export const taskFilterStore = signal<TaskFilter>({});
export const taskSearchStore = signal("");
export const taskPaginationStore = signal<PaginationOptions>({
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
});

export const taskCreateFormPanelOpenStore = signal(false);
export const taskCreateFormLoadingStore = signal(false);
export const taskCreateErrorStore = signal<string | null>(null);
