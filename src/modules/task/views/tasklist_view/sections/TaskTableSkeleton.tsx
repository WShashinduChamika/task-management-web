import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/ui/table";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { isAdminUserStore } from "@/modules/auth/store/auth.store";

export const TaskTableSkeleton = () => {
  const isAdmin = isAdminUserStore.value;
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="rounded-2xl border border-stone-neutral-4 bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden animate-in fade-in duration-500">
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
          {skeletonRows.map((_, index) => (
            <TableRow key={index} className="border-b-stone-neutral-4">
              <TableCell className="pl-4 sm:pl-6">
                <Skeleton className="h-5 w-3/4 max-w-[200px]" />
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <Skeleton className="h-5 w-full max-w-[280px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[70px] rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[90px] rounded-md" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                  <Skeleton className="h-5 w-[80px]" />
                </div>
              </TableCell>
              {isAdmin && (
                <TableCell>
                  <Skeleton className="h-5 w-[120px]" />
                </TableCell>
              )}
              {isAdmin && (
                <TableCell>
                  <Skeleton className="h-5 w-[120px]" />
                </TableCell>
              )}
              <TableCell className="pr-4 sm:pr-6">
                <Skeleton className="h-8 w-8 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="border-t border-border px-4 py-3 flex justify-between items-center bg-stone-neutral-2/50">
        <Skeleton className="h-5 w-[180px]" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
};
