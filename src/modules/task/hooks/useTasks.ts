import { useSignals } from "@preact/signals-react/runtime";

import {
  tasksDataStore,
  tasksLoadingStore,
  tasksErrorStore,
  taskFilterStore,
  taskSearchStore,
  taskPaginationStore,
  taskPaginationMetaStore,
} from "../store/task.store";
import {
  fetchTasksAction,
  //seedDummyTasksAction,
  setTaskFilterAction,
  setTaskSearchAction,
  setTaskPaginationAction,
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

  const hasActiveFilters =
    !!search ||
    !!filter.priority ||
    !!filter.status ||
    !!filter.createdBy ||
    !!filter.assignedTo;

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

  const handleCreatedByChange = (value: string) => {
    const newFilter: TaskFilter = {
      ...taskFilterStore.value,
      createdBy: (value === "all" ? undefined : value) as TaskFilter["createdBy"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleAssignedToChange = (value: string) => {
    const newFilter: TaskFilter = {
      ...taskFilterStore.value,
      assignedTo: (value === "all" ? undefined : value) as TaskFilter["assignedTo"],
    };
    setTaskFilterAction(newFilter);
  };

  const handleClearFilters = () => {
    setTaskSearchAction("");
    setTaskFilterAction({});
  };

  const handlePageChange = (newPage: number) => {
    const current = taskPaginationStore.value;
    setTaskPaginationAction({ ...current, page: newPage });
  };

  const handleLimitChange = (newLimit: number) => {
    const current = taskPaginationStore.value;
    setTaskPaginationAction({ ...current, limit: newLimit, page: 1 });
  };

  return {
    tasks: tasksDataStore.value,
    isLoading: tasksLoadingStore.value,
    error: tasksErrorStore.value,
    filter: taskFilterStore.value,
    search: taskSearchStore.value,
    hasActiveFilters,
    pagination: taskPaginationStore.value,
    paginationMeta: taskPaginationMetaStore.value,
    loadTasks,
    handleSearchChange,
    handlePriorityChange,
    handleStatusChange,
    handleCreatedByChange,
    handleAssignedToChange,
    handleClearFilters,
    handlePageChange,
    handleLimitChange,
  };
};
