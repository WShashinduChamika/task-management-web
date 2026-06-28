import type { UseFormReturn } from "react-hook-form";
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
import { Separator } from "../../../../../components/ui/separator";
import { RightPanel } from "../../../../../shared/ui/overlays/RightPanel";
import type { TaskFormValues } from "../../../validations/task.schema";

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
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const priority = watch("priority");
  const status = watch("status");

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
    >
      <form
        id="task-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-5 pt-2"
        noValidate
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="task-title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="task-title"
            type="text"
            placeholder="e.g. Design Landing Page"
            autoComplete="off"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="task-description">Description</Label>
          <textarea
            id="task-description"
            rows={3}
            placeholder="Brief description of the task…"
            aria-invalid={!!errors.description}
            className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 aria-[invalid=true]:border-destructive"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-priority">
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
                className="w-full"
                aria-invalid={!!errors.priority}
              >
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-xs text-destructive">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-status">
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
                className="w-full"
                aria-invalid={!!errors.status}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-xs text-destructive">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="task-due-date">
            Due Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="task-due-date"
            type="date"
            aria-invalid={!!errors.dueDate}
            {...register("dueDate")}
          />
          {errors.dueDate && (
            <p className="text-xs text-destructive">{errors.dueDate.message}</p>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button
            id="task-form-cancel-btn"
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button id="task-form-submit-btn" type="submit" disabled={isLoading}>
            {isLoading
              ? isEditing
                ? "Saving…"
                : "Creating…"
              : isEditing
                ? "Save Changes"
                : "Create Task"}
          </Button>
        </div>
      </form>
    </RightPanel>
  );
};
