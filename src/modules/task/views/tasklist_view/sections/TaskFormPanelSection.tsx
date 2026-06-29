import type { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { Loader2 } from "lucide-react";
import { cn } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { RightPanel } from "../../../../../shared/ui/overlays/RightPanel";
import type { TaskFormValues } from "../../../validations/task.schema";
import { isAdminUserStore } from "@/modules/auth/store/auth.store";
import { useActiveUsers } from "@/modules/user/hooks/useActiveUsers";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;
const STATUS_OPTIONS = ["Open", "In Progress", "Testing", "Done"] as const;

interface TaskFormPanelSectionProps {
  open: boolean;
  isEditing: boolean;
  form: UseFormReturn<TaskFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const TaskFormPanelSection = ({
  open,
  isEditing,
  form,
  onSubmit,
  onClose,
  isLoading,
}: TaskFormPanelSectionProps) => {
  useSignals();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const priority = watch("priority");
  const status = watch("status");
  const assignedTo = watch("assignedTo");
  const isAdmin = isAdminUserStore.value;

  const {
    users,
    isLoading: isUsersLoading,
    loadActiveUsers,
  } = useActiveUsers();

  useEffect(() => {
    if (open && isAdmin) {
      loadActiveUsers();
    }
  }, [open, isAdmin, loadActiveUsers]);

  return (
    <RightPanel
      open={open}
      title={isEditing ? "Edit Task" : "New Task"}
      description={
        isEditing
          ? "Update the details of the selected task."
          : "Fill in the details below to create a new task."
      }
      onClose={onClose}
      footer={
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            id="task-form-cancel-btn"
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-1/3 h-11 rounded-xl text-stone-neutral-11 hover:text-stone-neutral-12 hover:bg-stone-neutral-3 border-stone-neutral-4 font-semibold shadow-sm"
          >
            Cancel
          </Button>
          <Button
            id="task-form-submit-btn"
            type="submit"
            form="task-form"
            disabled={isLoading}
            className="w-full sm:w-2/3 h-11 bg-ocean-blue-9 hover:bg-ocean-blue-10 text-white rounded-xl shadow-md shadow-ocean-blue-9/25 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isEditing ? "Saving…" : "Creating…"}
              </>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      }
    >
      <form
        id="task-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="task-title"
            className="text-sm font-semibold text-primary ml-1"
          >
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="task-title"
            type="text"
            placeholder="e.g. Design Landing Page"
            autoComplete="off"
            aria-invalid={!!errors.title}
            {...register("title")}
            className="h-11 border-stone-neutral-4 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl transition-all duration-300 bg-white/70 shadow-sm text-base text-primary"
          />
          {errors.title && (
            <p className="text-xs text-destructive ml-1">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label
            htmlFor="task-description"
            className="text-sm font-semibold text-primary ml-1"
          >
            Description
          </Label>
          <textarea
            id="task-description"
            rows={4}
            placeholder="Brief description of the task…"
            aria-invalid={!!errors.description}
            className="w-full resize-none rounded-xl border border-stone-neutral-4 bg-white/70 px-3 py-3 text-base text-primary placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50 aria-[invalid=true]:border-destructive transition-all duration-300 shadow-sm"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive ml-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="task-priority"
              className="text-sm font-semibold text-primary ml-1"
            >
              Priority <span className="text-destructive">*</span>
            </Label>
            <Select
              value={priority}
              onValueChange={(val) =>
                setValue("priority", val as TaskFormValues["priority"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="task-priority"
                className="w-full h-11 border-stone-neutral-4 rounded-xl bg-white/70 shadow-sm focus:ring-primary/20"
                aria-invalid={!!errors.priority}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-stone-neutral-4 shadow-xl">
                {PRIORITY_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-xs text-destructive ml-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label
              htmlFor="task-status"
              className="text-sm font-semibold text-primary ml-1"
            >
              Status <span className="text-destructive">*</span>
            </Label>
            <Select
              value={status}
              onValueChange={(val) =>
                setValue("status", val as TaskFormValues["status"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger
                id="task-status"
                className="w-full h-11 border-stone-neutral-4 rounded-xl bg-white/70 shadow-sm focus:ring-primary/20"
                aria-invalid={!!errors.status}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-stone-neutral-4 shadow-xl">
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-xs text-destructive ml-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-sm font-semibold text-primary ml-1">
            Due Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="task-due-date"
            type="date"
            {...register("dueDate")}
            className={cn(
              "w-full h-11 border-stone-neutral-4 rounded-xl bg-white/70 shadow-sm focus:ring-primary/20",
              !!errors.dueDate &&
                "border-destructive focus-visible:ring-destructive/20",
            )}
          />
          {errors.dueDate && (
            <p className="text-xs text-destructive ml-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {isAdmin && (
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="task-assigned-to"
              className="text-sm font-semibold text-primary ml-1"
            >
              Assigned To
            </Label>
            <Select
              value={assignedTo || ""}
              onValueChange={(val) =>
                setValue("assignedTo", val === "none" ? "" : val, {
                  shouldValidate: true,
                })
              }
              disabled={isUsersLoading}
            >
              <SelectTrigger
                id="task-assigned-to"
                className="w-full h-11 border-stone-neutral-4 rounded-xl bg-white/70 shadow-sm focus:ring-primary/20"
                aria-invalid={!!errors.assignedTo}
              >
                <SelectValue
                  placeholder={
                    isUsersLoading
                      ? "Loading users..."
                      : "Select user (optional)"
                  }
                />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-stone-neutral-4 shadow-xl">
                <SelectItem value="none">Unassigned</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assignedTo && (
              <p className="text-xs text-destructive ml-1">
                {errors.assignedTo.message}
              </p>
            )}
          </div>
        )}
      </form>
    </RightPanel>
  );
};
