import { useSignals } from "@preact/signals-react/runtime";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Link } from "react-router-dom";
import { Separator } from "../../../components/ui/separator";

export const AppHeader = () => {
  useSignals();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3 sm:gap-3 sm:px-4 md:px-6">
      <SidebarTrigger />
      <Link
        to="/dashboard/tasks"
        className="min-w-0 truncate font-heading text-sm font-semibold tracking-tight sm:text-base"
      >
        Task Manager
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Dashboard
        </span>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
      </div>
    </header>
  );
};
