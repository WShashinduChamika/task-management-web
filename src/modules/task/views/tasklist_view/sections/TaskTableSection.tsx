import { useSignals } from "@preact/signals-react/runtime";
import { format } from "date-fns";
import {
  CalendarDays,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isAdminUserStore } from "@/modules/auth/store/auth.store";
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
import type {
  FetchTasksApiResponse,
  TaskPriority,
  TaskStatus,
} from "../../../types";
import { useTasks } from "@/modules/task/hooks/useTasks";
import { TaskPaginationSection } from "./TaskPaginationSection";
import { TaskTableSkeleton } from "./TaskTableSkeleton";

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

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const cfg = priorityConfig[priority];
  return <Badge variant="outline" className={`${cfg.className} font-semibold px-3 py-1 rounded-md text-sm`}>{cfg.label}</Badge>;
};

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const cfg = statusConfig[status];
  return (
    <Badge variant="outline" className={`${cfg.className} font-semibold px-3 py-1 rounded-md text-sm`}>
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

const EmptyRow = ({ isAdmin }: { isAdmin: boolean }) => (
  <TableRow>
    <TableCell colSpan={isAdmin ? 8 : 6} className="h-48 text-center">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-4xl">📋</span>
        <p className="text-sm font-medium">No tasks found</p>
        <p className="text-xs">Try adjusting your filters or search query.</p>
      </div>
    </TableCell>
  </TableRow>
);

const RowActions = ({
  task,
  onEdit,
  onDelete,
}: {
  task: FetchTasksApiResponse;
  onEdit: (task: FetchTasksApiResponse) => void;
  onDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();

  return (
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
          id={`task-view-${task.id}`}
          onClick={() => navigate(`/dashboard/tasks/${task.id}`)}
        >
          <Eye className="mr-2 size-3.5" />
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          id={`task-edit-${task.id}`}
          onClick={() => onEdit(task)}
        >
          <Pencil className="mr-2 size-3.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          id={`task-delete-${task.id}`}
          variant="destructive"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="mr-2 size-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TaskTableSection = ({
  onEdit,
  onDelete,
}: {
  onEdit: (task: FetchTasksApiResponse) => void;
  onDelete: (id: string) => void;
}) => {
  useSignals();

  const { tasks, isLoading } = useTasks();
  const isAdmin = isAdminUserStore.value;

  if (isLoading) {
    return <TaskTableSkeleton />;
  }

  return (
    <div className="rounded-2xl border border-stone-neutral-4 bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-stone-neutral-2/80">
          <TableRow className="hover:bg-transparent border-b-stone-neutral-4">
            <TableHead className="w-[280px] pl-4 sm:pl-6 text-base font-semibold text-stone-neutral-11">Title</TableHead>
            <TableHead className="hidden xl:table-cell text-base font-semibold text-stone-neutral-11">Description</TableHead>
            <TableHead className="w-[100px] text-base font-semibold text-stone-neutral-11">Priority</TableHead>
            <TableHead className="w-[130px] text-base font-semibold text-stone-neutral-11">Status</TableHead>
            <TableHead className="w-[140px] text-base font-semibold text-stone-neutral-11">Due Date</TableHead>
            {isAdmin && <TableHead className="w-[150px] text-base font-semibold text-stone-neutral-11">Created By</TableHead>}
            {isAdmin && (
              <TableHead className="w-[150px] text-base font-semibold text-stone-neutral-11">Assigned To</TableHead>
            )}
            <TableHead className="w-[52px] pr-4 sm:pr-6" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks?.length === 0 ? (
            <EmptyRow isAdmin={isAdmin} />
          ) : (
            tasks?.map((task) => (
              <TableRow key={task.id} className="group hover:bg-ocean-blue-1/40 transition-colors border-b-stone-neutral-4">
                <TableCell className="font-semibold text-base text-primary pl-4 sm:pl-6">{task.title}</TableCell>
                <TableCell className="hidden max-w-[320px] truncate text-muted-foreground text-base xl:table-cell">
                  {task.description ?? "—"}
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell className="text-base text-muted-foreground">
                  {formatDueDate(task.dueDate)}
                </TableCell>
                {isAdmin && (
                  <TableCell className="text-base text-muted-foreground">
                    {task.createdBy
                      ? `${task.createdBy.firstName} ${task.createdBy.lastName}`.trim()
                      : "—"}
                  </TableCell>
                )}
                {isAdmin && (
                  <TableCell className="text-base text-muted-foreground">
                    {task.assignedTo
                      ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`.trim()
                      : "—"}
                  </TableCell>
                )}
                <TableCell className="pr-4 sm:pr-6">
                  <RowActions
                    task={task}
                    onEdit={onEdit}
                    onDelete={() => onDelete(task.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="border-t border-border">
        <TaskPaginationSection />
      </div>
    </div>
  );
};
