import { useSignals } from "@preact/signals-react/runtime";

import {
  tasksDataStore,
  tasksLoadingStore,
  tasksErrorStore,
  taskFilterStore,
  taskSearchStore,
  filteredTasks,
} from "../store/task.store";
import {
  seedDummyTasksAction,
  setTaskFilterAction,
  setTaskSearchAction,
} from "../store/task.actions";
import type { TaskFilter } from "../types";

export const useTasks = () => {
  useSignals();

  const loadTasks = () => {
    if (tasksDataStore.value.length === 0) {
      seedDummyTasksAction();
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
      priority: (value === "all" ? "" : value) as TaskFilter["priority"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleStatusChange = (value: string) => {
    const newFilter: TaskFilter = {
      ...taskFilterStore.value,
      status: (value === "all" ? "" : value) as TaskFilter["status"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleClearFilters = () => {
    setTaskSearchAction("");
    setTaskFilterAction({});
  };

  return {
    tasks: filteredTasks.value,
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
