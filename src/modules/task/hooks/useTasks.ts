import { useSignals } from "@preact/signals-react/runtime";

import {
  tasksDataStore,
  tasksLoadingStore,
  tasksErrorStore,
  taskFilterStore,
  taskSearchStore,
} from "../store/task.store";
import {
  fetchTasksAction,
  //seedDummyTasksAction,
  setTaskFilterAction,
  setTaskSearchAction,
} from "../store/task.actions";
import type { TaskFilter } from "../types";
import { toast } from "sonner";

export const useTasks = () => {
  useSignals();

  const loadTasks = async () => {
    // if (tasksDataStore.value.length === 0) {
    //   seedDummyTasksAction();
    // }
    const ok = await fetchTasksAction();
    if (!ok) {
      toast.error("Failed to fetch tasks", {
        description:
          tasksErrorStore.value ?? "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  };

  const filter = taskFilterStore.value;
  const search = taskSearchStore.value;

  const hasActiveFilters = !!search || !!filter.priority || !!filter.status;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskSearchAction(e.target.value);
  };

  const handlePriorityChange = (value: string) => {
    const newFilter: TaskFilter = {
      ...taskFilterStore.value,
      priority: (value === "all" ? null : value) as TaskFilter["priority"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleStatusChange = (value: string) => {
    const newFilter: TaskFilter = {
      ...taskFilterStore.value,
      status: (value === "all" ? null : value) as TaskFilter["status"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleClearFilters = () => {
    setTaskSearchAction("");
    setTaskFilterAction({});
  };

  return {
    tasks: tasksDataStore.value,
    isLoading: tasksLoadingStore.value,
    error: tasksErrorStore.value,
    filter: taskFilterStore.value,
    search: taskSearchStore.value,
    hasActiveFilters,
    loadTasks,
    handleSearchChange,
    handlePriorityChange,
    handleStatusChange,
    handleClearFilters,
  };
};
