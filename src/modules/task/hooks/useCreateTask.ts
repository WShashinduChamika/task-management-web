import { useSignals } from "@preact/signals-react/runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TaskFormSchema,
  type TaskFormValues,
} from "../validations/task.schema";
import {
  taskCreateFormPanelOpenStore,
  taskCreateFormLoadingStore,
  taskCreateErrorStore,
} from "../store/task.store";
import {
  openTaskCreateFormPanelAction,
  closeTaskCreateFormPanelAction,
  createTaskAction,
} from "../store/task.actions";
import { toast } from "sonner";
import { toIsoString } from "@/utils/date-format";

export const useCreateTask = () => {
  useSignals();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: undefined,
      status: "Open",
      dueDate: "",
      assignedTo: "",
    },
  });

  const openPanel = () => {
    form.reset();
    openTaskCreateFormPanelAction();
  };

  const closePanel = () => {
    closeTaskCreateFormPanelAction();
    form.reset();
  };

  const onSubmit = form.handleSubmit(async (values) => {
    const ok = await createTaskAction({
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      dueDate: toIsoString(values.dueDate),
      assignedTo: values.assignedTo || undefined,
    });

    if (ok) {
      toast.success("Task created!", {
        description: `"${values.title}" has been added successfully.`,
        duration: 3000,
      });
      form.reset();
    } else {
      toast.error("Failed to create task", {
        description:
          taskCreateErrorStore.value ??
          "Something went wrong. Please try again.",
        duration: 5000,
      });
    }
  });

  return {
    form,
    isPanelOpen: taskCreateFormPanelOpenStore.value,
    isLoading: taskCreateFormLoadingStore.value,
    openPanel,
    closePanel,
    onSubmit,
  };
};
