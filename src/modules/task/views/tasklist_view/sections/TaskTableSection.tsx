import { useSignals } from "@preact/signals-react/runtime";
import { format } from "date-fns";
import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import type { Task, TaskPriority, TaskStatus } from "../../../types";
import { useTasks } from "@/modules/task/hooks/useTasks";

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

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const cfg = priorityConfig[priority];
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
};

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const cfg = statusConfig[status];
  return (
    <Badge variant="outline" className={cfg.className}>
      {cfg.label}
    </Badge>
  );
};

const formatDueDate = (date?: string) => {
  if (!date) return <span className="text-muted-foreground/50">—</span>;
  try {
    return (
      <span className="flex items-center gap-1.5">
        <CalendarDays className="size-3.5 text-muted-foreground" />
        {format(new Date(date), "MMM d, yyyy")}
      </span>
    );
  } catch {
    return date;
  }
};

const EmptyRow = () => (
  <TableRow>
    <TableCell colSpan={6} className="h-48 text-center">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-4xl">📋</span>
        <p className="text-sm font-medium">No tasks found</p>
        <p className="text-xs">Try adjusting your filters or search query.</p>
      </div>
    </TableCell>
  </TableRow>
);

const RowActions = ({ task }: { task: Task }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        id={`task-row-actions-${task.id}`}
        variant="ghost"
        size="icon"
        className="size-8"
      >
        <MoreHorizontal className="size-4" />
        <span className="sr-only">Open menu for {task.title}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-40">
      <DropdownMenuItem
        id={`task-edit-${task.id}`}
        onClick={() => {
          console.log("Edit task");
        }}
      >
        <Pencil className="mr-2 size-3.5" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        id={`task-delete-${task.id}`}
        variant="destructive"
        onClick={() => {
          console.log("Delete task");
        }}
      >
        <Trash2 className="mr-2 size-3.5" />
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export const TaskTableSection = () => {
  useSignals();

  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        <span className="text-sm">Loading tasks…</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px]">Title</TableHead>
            <TableHead className="hidden xl:table-cell">Description</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            <TableHead className="w-[130px]">Status</TableHead>
            <TableHead className="w-[140px]">Due Date</TableHead>
            <TableHead className="w-[52px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <EmptyRow />
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="group">
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="hidden max-w-[320px] truncate text-muted-foreground xl:table-cell">
                  {task.description ?? "—"}
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDueDate(task.dueDate)}
                </TableCell>
                <TableCell>
                  <RowActions task={task} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
