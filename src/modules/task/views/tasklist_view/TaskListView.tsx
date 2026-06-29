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
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { TaskDeleteConfirmDialog } from "../shared/TaskDeleteConfirmDialog";
import { useNavigate } from "react-router-dom";

export const TaskListView = () => {
  useSignals();

  const { loadTasks, filter, search, pagination } = useTasks();

  const {
    form: createForm,
    isPanelOpen: isCreateOpen,
    isLoading: isCreating,
    openPanel: openCreate,
    closePanel: closeCreate,
    onSubmit: onCreateSubmit,
  } = useCreateTask();

  const {
    form: updateForm,
    isPanelOpen: isUpdateOpen,
    isLoading: isUpdating,
    openPanel: openUpdate,
    closePanel: closeUpdate,
    onSubmit: onUpdateSubmit,
  } = useUpdateTask();

  const { isOpen, isLoading, openDelete, closeDelete, onConfirm } =
    useDeleteTask();

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, [filter, search, pagination]);

  return (
    <div className="flex flex-col gap-4 max-w-[1600px] mx-auto w-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-white/70 backdrop-blur-xl p-2 sm:p-3 rounded-lg border border-stone-neutral-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-ocean-blue-2 rounded-lg text-ocean-blue-9 shadow-sm">
            <ClipboardList className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary leading-tight">Tasks</h1>
            <p className="text-xs text-secondary-foreground font-medium">
              Manage and track all project tasks.
            </p>
          </div>
        </div>
        <Button
          id="create-task-btn"
          onClick={openCreate}
          className="mt-2 w-full sm:mt-0 sm:w-auto h-9 bg-ocean-blue-9 hover:bg-ocean-blue-10 text-white rounded-lg shadow-md shadow-ocean-blue-9/25 transition-all duration-300 transform hover:-translate-y-0.5 font-medium px-4 text-sm"
        >
          <Plus className="mr-1.5 size-4" />
          New Task
        </Button>
      </div>

      <TaskFilterSection />

      <TaskTableSection onEdit={openUpdate} onDelete={openDelete} />

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

      <TaskDeleteConfirmDialog
        open={isOpen}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={() =>
          onConfirm(() => navigate("/dashboard/tasks", { replace: true }))
        }
        isLoading={isLoading}
      />
    </div>
  );
};
