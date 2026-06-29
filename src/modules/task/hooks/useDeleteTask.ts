import { useSignals } from "@preact/signals-react/runtime";
import {
  taskDeleteDialogOpenStore,
  taskDeleteLoadingStore,
  taskDeleteErrorStore,
} from "../store/task.store";
import {
  openTaskDeleteDialogAction,
  closeTaskDeleteDialogAction,
  deleteTaskAction,
} from "../store/task.actions";
import { toast } from "sonner";

export const useDeleteTask = () => {
  useSignals();

  const openDeleteDialog = (id: string) => {
    openTaskDeleteDialogAction(id);
  };

  const closeDeleteDialog = () => {
    closeTaskDeleteDialogAction();
  };

  const onConfirm = async (onSuccess?: () => void) => {
    const ok = await deleteTaskAction();
    if (ok) {
      toast.success("Task deleted", {
        description: "The task has been removed successfully.",
        duration: 3000,
      });
      onSuccess?.();
    } else {
      toast.error("Failed to delete task", {
        description:
          taskDeleteErrorStore.value ??
          "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  };

  return {
    isOpen: taskDeleteDialogOpenStore.value,
    isLoading: taskDeleteLoadingStore.value,
    openDelete: openDeleteDialog,
    closeDelete: closeDeleteDialog,
    onConfirm,
  };
};
