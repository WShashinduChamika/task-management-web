import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  User,
  UserCheck,
  Clock,
  ClipboardList,
  AlertCircle,
  Activity,
  Flag,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { useTask } from "../../hooks/useTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import { TaskFormPanelSection } from "../tasklist_view/sections/TaskFormPanelSection";
import { TaskDeleteConfirmDialog } from "../shared/TaskDeleteConfirmDialog";
import type { TaskPriority, TaskStatus } from "../../types";

const priorityConfig: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  High: { label: "High", className: "bg-cherry-red-2 text-cherry-red-10 border-cherry-red-4" },
  Medium: { label: "Medium", className: "bg-lemon-yellow-2 text-lemon-yellow-11 border-lemon-yellow-5" },
  Low: { label: "Low", className: "bg-sage-green-2 text-sage-green-11 border-sage-green-5" },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  Open: {
    label: "Open",
    className: "border-stone-neutral-6 bg-stone-neutral-2 text-stone-neutral-11 hover:bg-stone-neutral-3",
  },
  "In Progress": {
    label: "In Progress",
    className: "border-ocean-blue-5 bg-ocean-blue-2 text-ocean-blue-10 hover:bg-ocean-blue-3",
  },
  Testing: {
    label: "Testing",
    className: "border-flash-purple-5 bg-flash-purple-2 text-flash-purple-10 hover:bg-flash-purple-3",
  },
  Done: {
    label: "Done",
    className: "border-forest-green-5 bg-forest-green-2 text-forest-green-10 hover:bg-forest-green-3",
  },
};

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col gap-6 p-4 sm:p-6">
    <Card className="border-destructive/40 bg-destructive/5">
      <CardContent className="flex flex-col items-center gap-3 py-12">
        <AlertCircle className="size-10 text-destructive" />
        <p className="text-sm font-medium text-destructive">
          Failed to load task
        </p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  </div>
);

const MetaItem = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2 p-4 bg-stone-neutral-2/40 rounded-xl border border-stone-neutral-4 shadow-sm">
    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ocean-blue-9">
      <Icon className="size-4" />
      {label}
    </span>
    <div className="text-base font-medium text-primary">{children}</div>
  </div>
);

const formatDate = (date?: string) => {
  if (!date) return <span className="text-muted-foreground/50">—</span>;
  try {
    return format(new Date(date), "MMM d, yyyy · h:mm a");
  } catch {
    return date;
  }
};

const formatDueDate = (date?: string) => {
  if (!date) return <span className="text-muted-foreground/50">—</span>;
  try {
    const d = new Date(date);
    const isPast = d < new Date();
    return (
      <span className={isPast ? "text-destructive" : undefined}>
        {format(d, "MMM d, yyyy")}
        {isPast && (
          <span className="ml-1.5 text-xs font-normal text-destructive/70">
            (overdue)
          </span>
        )}
      </span>
    );
  } catch {
    return date;
  }
};

const userLabel = (
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null,
) => {
  if (!user) return <span className="text-muted-foreground/50 font-medium">—</span>;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "U";
  return (
    <div className="flex items-center gap-3">
      <div className="flex shrink-0 items-center justify-center size-9 rounded-full bg-ocean-blue-9 text-white font-bold text-sm shadow-sm">
        {initials}
      </div>
      <div className="flex flex-col">
        {name && <span className="text-sm font-semibold text-primary">{name}</span>}
        {user.email && (
          <span className="text-xs font-medium text-secondary-foreground">
            {user.email}
          </span>
        )}
      </div>
    </div>
  );
};

export const TaskDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { task, isLoading, error } = useTask(id);
  const {
    form,
    isPanelOpen,
    isLoading: isUpdating,
    openPanel,
    closePanel,
    onSubmit,
  } = useUpdateTask();

  const {
    isOpen: isDeleteOpen,
    isLoading: isDeleting,
    openDelete,
    closeDelete,
    onConfirm,
  } = useDeleteTask();

  if (isLoading) return "Loading...";
  if (error) return <ErrorState message={error} />;
  if (!task) return null;

  const priorityCfg = priorityConfig[task.priority];
  const statusCfg = statusConfig[task.status];

  return (
    <div className="flex flex-col gap-4 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/70 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-stone-neutral-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            id="task-detail-back-btn"
            variant="outline"
            size="icon"
            className="size-9 shrink-0 rounded-lg border-stone-neutral-4 hover:bg-stone-neutral-3 text-stone-neutral-11"
            onClick={() => navigate(-1)}
            title="Back to tasks"
          >
            <ArrowLeft className="size-4" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-ocean-blue-2 rounded-lg text-ocean-blue-9 shadow-sm">
              <ClipboardList className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-primary leading-tight">Task Details</h1>
              <p className="text-xs text-secondary-foreground font-medium">
                View and manage task information.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border-stone-neutral-4 bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden">
        <CardHeader className="gap-4 px-6 sm:px-8 py-6 bg-stone-neutral-1/50 border-b border-stone-neutral-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-primary leading-snug">{task.title}</CardTitle>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                id="task-detail-update-btn"
                variant="outline"
                className="h-9 rounded-lg border-stone-neutral-4 text-stone-neutral-11 hover:text-ocean-blue-10 hover:bg-ocean-blue-2 hover:border-ocean-blue-4 shadow-sm font-semibold px-4 transition-colors"
                onClick={() => openPanel(task)}
              >
                <Pencil className="mr-1.5 size-4" /> Update
              </Button>
              <Button
                id="task-detail-delete-btn"
                variant="destructive"
                className="h-9 rounded-lg shadow-sm font-semibold px-4 hover:bg-destructive/90 transition-colors"
                onClick={() => openDelete(task.id)}
              >
                <Trash2 className="mr-1.5 size-4" /> Delete
              </Button>
            </div>
          </div>
          {task.description && (
            <CardDescription className="text-base leading-relaxed text-secondary-foreground font-medium">
              {task.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-8 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetaItem icon={Activity} label="Status">
              <Badge variant="outline" className={`${statusCfg.className} px-3 py-1 text-sm font-semibold rounded-md`}>
                {statusCfg.label}
              </Badge>
            </MetaItem>

            <MetaItem icon={Flag} label="Priority">
              <Badge variant="outline" className={`${priorityCfg.className} px-3 py-1 text-sm font-semibold rounded-md`}>
                {priorityCfg.label}
              </Badge>
            </MetaItem>

            <MetaItem icon={CalendarDays} label="Due Date">
              {formatDueDate(task.dueDate)}
            </MetaItem>

            <MetaItem icon={Clock} label="Created">
              {formatDate(task.createdAt)}
            </MetaItem>

            <MetaItem icon={Clock} label="Updated">
              {formatDate(task.updatedAt)}
            </MetaItem>
          </div>

          <Separator className="bg-stone-neutral-4" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MetaItem icon={User} label="Created By">
              {userLabel("createdBy" in task ? (task as any).createdBy : null)}
            </MetaItem>

            <MetaItem icon={UserCheck} label="Assigned To">
              {userLabel(
                "assignedTo" in task ? (task as any).assignedTo : null,
              )}
            </MetaItem>
          </div>
        </CardContent>
      </Card>

      <TaskFormPanelSection
        open={isPanelOpen}
        isEditing={true}
        form={form}
        onSubmit={onSubmit}
        onClose={closePanel}
        isLoading={isUpdating}
      />

      <TaskDeleteConfirmDialog
        open={isDeleteOpen}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={() =>
          onConfirm(() => navigate("/dashboard/tasks/", { replace: true }))
        }
        isLoading={isDeleting}
      />
    </div>
  );
};
