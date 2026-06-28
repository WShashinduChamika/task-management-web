import { useSignals } from "@preact/signals-react/runtime";
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

const PRIORITY_OPTIONS = ["Low", "Medium", "High"] as const;
const STATUS_OPTIONS = ["Open", "In Progress", "Testing", "Done"] as const;

export const TaskFilterSection = () => {
  useSignals();

  const {
    search,
    filter,
    hasActiveFilters,
    handleSearchChange,
    handlePriorityChange,
    handleStatusChange,
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

      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />

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
