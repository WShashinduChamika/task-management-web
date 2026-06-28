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
} from "../store/task.store";
import {
  openTaskCreateFormPanelAction,
  closeTaskCreateFormPanelAction,
  createTaskAction,
} from "../store/task.actions";

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
    await createTaskAction(values);
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
