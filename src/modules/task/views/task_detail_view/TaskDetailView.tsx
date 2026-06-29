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
import type { TaskPriority, TaskStatus } from "../../types";

const priorityConfig: Record<
  TaskPriority,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  High: { label: "High", variant: "destructive" },
  Medium: { label: "Medium", variant: "default" },
  Low: { label: "Low", variant: "secondary" },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  Open: {
    label: "Open",
    className:
      "border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
  },
  "In Progress": {
    label: "In Progress",
    className:
      "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
  },
  Testing: {
    label: "Testing",
    className:
      "border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20",
  },
  Done: {
    label: "Done",
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
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
  <div className="flex flex-col gap-1.5">
    <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      <Icon className="size-3.5" />
      {label}
    </span>
    <div className="text-sm font-medium text-foreground">{children}</div>
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
  if (!user) return <span className="text-muted-foreground/50">—</span>;
  const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return (
    <div className="flex flex-col gap-0.5">
      {name && <span>{name}</span>}
      {user.email && (
        <span className="text-xs font-normal text-muted-foreground">
          {user.email}
        </span>
      )}
    </div>
  );
};

export const TaskDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { task, isLoading, error } = useTask(id);

  if (isLoading) return "Loading...";
  if (error) return <ErrorState message={error} />;
  if (!task) return null;

  const priorityCfg = priorityConfig[task.priority];
  const statusCfg = statusConfig[task.status];

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <Button
          id="task-detail-back-btn"
          variant="outline"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => navigate(-1)}
          title="Back to tasks"
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="flex items-center gap-2">
          <ClipboardList className="size-5 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight">Task Details</h1>
        </div>
      </div>

      <Card>
        <CardHeader className="gap-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <CardTitle className="text-xl leading-snug">{task.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Update task", task.id)}
              >
                <Pencil className="mr-1.5 size-4" /> Update
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => console.log("Delete task", task.id)}
              >
                <Trash2 className="mr-1.5 size-4" /> Delete
              </Button>
            </div>
          </div>
          {task.description && (
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              {task.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <Separator />

          <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-y-8">
            <MetaItem icon={Activity} label="Status">
              <Badge variant="outline" className={statusCfg.className}>
                {statusCfg.label}
              </Badge>
            </MetaItem>

            <MetaItem icon={Flag} label="Priority">
              <Badge variant={priorityCfg.variant}>{priorityCfg.label}</Badge>
            </MetaItem>

            <MetaItem icon={CalendarDays} label="Due Date">
              {formatDueDate(task.dueDate)}
            </MetaItem>

            <MetaItem icon={Clock} label="Created">
              {formatDate(task.createdAt)}
            </MetaItem>

            <MetaItem icon={Clock} label="Last Updated">
              {formatDate(task.updatedAt)}
            </MetaItem>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
    </div>
  );
};
