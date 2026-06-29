import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { fetchTaskByIdAction } from "../store/task.actions";
import {
  taskDetailStore,
  taskDetailLoadingStore,
  taskDetailErrorStore,
} from "../store/task.store";

export const useTask = (id: string | undefined) => {
  useSignals();

  useEffect(() => {
    if (!id) return;

    fetchTaskByIdAction(id);

    return () => {
      taskDetailStore.value = null;
      taskDetailLoadingStore.value = false;
      taskDetailErrorStore.value = null;
    };
  }, [id]);

  return {
    task: taskDetailStore.value,
    isLoading: taskDetailLoadingStore.value,
    error: taskDetailErrorStore.value,
  };
};
