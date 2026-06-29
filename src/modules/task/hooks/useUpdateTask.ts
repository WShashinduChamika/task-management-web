import { useSignals } from "@preact/signals-react/runtime";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TaskFormSchema,
  type TaskFormValues,
} from "../validations/task.schema";
import {
  taskUpdateFormPanelOpenStore,
  taskUpdateFormLoadingStore,
  taskUpdateErrorStore,
} from "../store/task.store";
import {
  openTaskUpdateFormPanelAction,
  closeTaskUpdateFormPanelAction,
  updateTaskAction,
} from "../store/task.actions";
import { toast } from "sonner";
import { toIsoString } from "@/utils/date-format";
import type { FetchTaskByIdApiResponse } from "../types";

export const useUpdateTask = () => {
  useSignals();

  const editingTaskIdRef = useRef<string>("");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      status: "Open",
      dueDate: "",
    },
  });

  const openPanel = (task: FetchTaskByIdApiResponse) => {
    editingTaskIdRef.current = task.id;
    form.reset({
      title: task.title,
      description: task.description ?? "",
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    openTaskUpdateFormPanelAction();
  };

  const closePanel = () => {
    closeTaskUpdateFormPanelAction();
    form.reset();
    editingTaskIdRef.current = "";
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const taskId = editingTaskIdRef.current;
    if (!taskId) return;

    const ok = await updateTaskAction(taskId, {
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      dueDate: toIsoString(values.dueDate),
    });

    if (ok) {
      toast.success("Task updated!", {
        description: `"${values.title}" has been saved successfully.`,
        duration: 3000,
      });
    } else {
      toast.error("Failed to update task", {
        description:
          taskUpdateErrorStore.value ??
          "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  });

  return {
    form,
    isPanelOpen: taskUpdateFormPanelOpenStore.value,
    isLoading: taskUpdateFormLoadingStore.value,
    openPanel,
    closePanel,
    onSubmit,
  };
};
