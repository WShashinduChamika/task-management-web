import { computed, signal } from "@preact/signals-react";
import type { Task, TaskFilter } from "../types";

export const tasksDataStore = signal<Task[]>([]);
export const tasksLoadingStore = signal(false);
export const tasksErrorStore = signal<string | null>(null);
export const taskFilterStore = signal<TaskFilter>({});
export const taskSearchStore = signal("");

export const taskCreateFormPanelOpenStore = signal(false);
export const taskCreateFormLoadingStore = signal(false);
export const taskCreateErrorStore = signal<string | null>(null);

export const filteredTasks = computed(() => {
  const tasks = tasksDataStore.value;
  const filter = taskFilterStore.value;
  const search = taskSearchStore.value.toLowerCase();

  return tasks.filter((task) => {
    const matchesTitle = search
      ? task.title.toLowerCase().includes(search)
      : true;
    const matchesPriority = filter.priority
      ? task.priority === filter.priority
      : true;
    const matchesStatus = filter.status ? task.status === filter.status : true;
    return matchesTitle && matchesPriority && matchesStatus;
  });
});
