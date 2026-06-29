import { useSignals } from "@preact/signals-react/runtime";
import { Plus, ClipboardList } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { TaskFilterSection } from "./sections/TaskFilterSection";
import { TaskTableSection } from "./sections/TaskTableSection";
import { TaskFormPanelSection } from "./sections/TaskFormPanelSection";
import { useTasks } from "../../hooks/useTasks";
import { useCreateTask } from "../../hooks/useCreateTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useEffect } from "react";

export const TaskListView = () => {
  useSignals();

  const { loadTasks, filter, search, pagination } = useTasks();

  const { form: createForm, isPanelOpen: isCreateOpen, isLoading: isCreating, openPanel: openCreate, closePanel: closeCreate, onSubmit: onCreateSubmit } =
    useCreateTask();

  const { form: updateForm, isPanelOpen: isUpdateOpen, isLoading: isUpdating, openPanel: openUpdate, closePanel: closeUpdate, onSubmit: onUpdateSubmit } =
    useUpdateTask();

  useEffect(() => {
    loadTasks();
  }, [filter, search, pagination]);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="size-5 text-primary" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Tasks</h1>
            <p className="text-sm text-muted-foreground">
              Manage and track all project tasks.
            </p>
          </div>
        </div>
        <Button
          id="create-task-btn"
          size="sm"
          onClick={openCreate}
          className="mt-2 w-full sm:mt-0 sm:w-auto"
        >
          <Plus className="mr-1.5 size-4" />
          New Task
        </Button>
      </div>

      <TaskFilterSection />

      <TaskTableSection onEdit={openUpdate} />

      {/* Create panel */}
      <TaskFormPanelSection
        open={isCreateOpen}
        isEditing={false}
        form={createForm}
        onSubmit={onCreateSubmit}
        onClose={closeCreate}
        isLoading={isCreating}
      />

      {/* Update panel */}
      <TaskFormPanelSection
        open={isUpdateOpen}
        isEditing={true}
        form={updateForm}
        onSubmit={onUpdateSubmit}
        onClose={closeUpdate}
        isLoading={isUpdating}
      />
    </div>
  );
};
