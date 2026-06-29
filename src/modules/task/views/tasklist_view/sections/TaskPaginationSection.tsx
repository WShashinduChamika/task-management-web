import { useSignals } from "@preact/signals-react/runtime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { useTasks } from "../../../hooks/useTasks";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export const TaskPaginationSection = () => {
  useSignals();

  const { pagination, paginationMeta, handlePageChange, handleLimitChange } =
    useTasks();

  const currentPage = paginationMeta?.page ?? pagination.page ?? 1;
  const totalPages = paginationMeta?.totalPages ?? 1;
  const total = paginationMeta?.total ?? 0;
  const limit = paginationMeta?.limit ?? pagination.limit ?? 10;

  const from = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, total);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        {total === 0 ? (
          "No results"
        ) : (
          <>
            Showing{" "}
            <span className="font-medium text-foreground">
              {from}–{to}
            </span>{" "}
            of <span className="font-medium text-foreground">{total}</span>{" "}
            tasks
          </>
        )}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Rows per page</span>
          <Select
            value={String(limit)}
            onValueChange={(v) => handleLimitChange(Number(v))}
          >
            <SelectTrigger
              id="task-page-size-select"
              className="h-8 w-[70px] text-xs"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <span className="min-w-[80px] text-center text-xs text-muted-foreground">
          Page{" "}
          <span className="font-medium text-foreground">{currentPage}</span> of{" "}
          <span className="font-medium text-foreground">{totalPages}</span>
        </span>

        <div className="flex items-center gap-1">
          <Button
            id="pagination-first-page"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!canPrev}
            onClick={() => handlePageChange(1)}
            title="First page"
          >
            <ChevronsLeft className="size-3.5" />
            <span className="sr-only">First page</span>
          </Button>

          <Button
            id="pagination-prev-page"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!canPrev}
            onClick={() => handlePageChange(currentPage - 1)}
            title="Previous page"
          >
            <ChevronLeft className="size-3.5" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button
            id="pagination-next-page"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!canNext}
            onClick={() => handlePageChange(currentPage + 1)}
            title="Next page"
          >
            <ChevronRight className="size-3.5" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button
            id="pagination-last-page"
            variant="outline"
            size="icon"
            className="size-8"
            disabled={!canNext}
            onClick={() => handlePageChange(totalPages)}
            title="Last page"
          >
            <ChevronsRight className="size-3.5" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
