import { useSignals } from "@preact/signals-react/runtime";
import { useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { useTasks } from "../../../hooks/useTasks";
import { isAdminUserStore } from "@/modules/auth/store/auth.store";
import { useActiveUsers } from "@/modules/user/hooks/useActiveUsers";

const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;
const STATUS_OPTIONS = ["Open", "In Progress", "Testing", "Done"] as const;

export const TaskFilterSection = () => {
  useSignals();

  const isAdmin = isAdminUserStore.value;
  const { users, isLoading: isUsersLoading, loadActiveUsers } = useActiveUsers();

  useEffect(() => {
    if (isAdmin) {
      loadActiveUsers();
    }
  }, [isAdmin, loadActiveUsers]);

  const {
    search,
    filter,
    hasActiveFilters,
    handleSearchChange,
    handlePriorityChange,
    handleStatusChange,
    handleCreatedByChange,
    handleAssignedToChange,
    handleClearFilters,
  } = useTasks();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="task-search-input"
          placeholder="Search tasks by title…"
          value={search}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />

        {isAdmin && (
          <>
            <Select
              value={filter.createdBy || "all"}
              onValueChange={handleCreatedByChange}
              disabled={isUsersLoading}
            >
              <SelectTrigger id="task-created-by-filter" className="w-[140px]">
                <SelectValue placeholder="Created By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Creators</SelectItem>
                {users.map((user) => (
                  <SelectItem key={`creator-${user.id}`} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filter.assignedTo || "all"}
              onValueChange={handleAssignedToChange}
              disabled={isUsersLoading}
            >
              <SelectTrigger id="task-assigned-to-filter" className="w-[140px]">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                {users.map((user) => (
                  <SelectItem key={`assignee-${user.id}`} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

        <Select
          value={filter.priority || "all"}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger id="task-priority-filter" className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {PRIORITY_OPTIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filter.status || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger id="task-status-filter" className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            id="task-clear-filters-btn"
            variant="ghost"
            size="icon"
            onClick={handleClearFilters}
            title="Clear all filters"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
