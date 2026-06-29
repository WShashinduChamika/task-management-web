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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center p-2 sm:p-3 bg-white/70 backdrop-blur-xl border border-stone-neutral-4 rounded-lg shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/60" />
        <Input
          id="task-search-input"
          placeholder="Search tasks by title…"
          value={search}
          onChange={handleSearchChange}
          className="pl-9 h-9 text-sm border-stone-neutral-4 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg transition-all duration-300 bg-white/80 shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center justify-center p-2 bg-stone-neutral-2 rounded-lg hidden sm:flex border border-stone-neutral-4 shadow-sm">
          <SlidersHorizontal className="size-4 text-primary/70" />
        </div>

        {isAdmin && (
          <>
            <Select
              value={filter.createdBy || "all"}
              onValueChange={handleCreatedByChange}
              disabled={isUsersLoading}
            >
              <SelectTrigger id="task-created-by-filter" className="w-[130px] h-9 text-sm rounded-lg bg-white/80 border-stone-neutral-4 shadow-sm focus:ring-primary/20">
                <SelectValue placeholder="Created By" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-stone-neutral-4 shadow-lg text-sm">
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
              <SelectTrigger id="task-assigned-to-filter" className="w-[130px] h-9 text-sm rounded-lg bg-white/80 border-stone-neutral-4 shadow-sm focus:ring-primary/20">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-stone-neutral-4 shadow-lg text-sm">
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
          <SelectTrigger id="task-priority-filter" className="w-[120px] h-9 text-sm rounded-lg bg-white/80 border-stone-neutral-4 shadow-sm focus:ring-primary/20">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-stone-neutral-4 shadow-lg text-sm">
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
          <SelectTrigger id="task-status-filter" className="w-[130px] h-9 text-sm rounded-lg bg-white/80 border-stone-neutral-4 shadow-sm focus:ring-primary/20">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-stone-neutral-4 shadow-lg text-sm">
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
            onClick={handleClearFilters}
            className="h-9 px-3 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors font-medium flex items-center gap-1.5"
            title="Clear all filters"
          >
            <X className="size-3.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
