import { useSignals } from "@preact/signals-react/runtime";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Link } from "react-router-dom";
import { Separator } from "../../../components/ui/separator";
import { UserCircle } from "lucide-react";

export const AppHeader = () => {
  useSignals();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-stone-neutral-4 bg-white/70 backdrop-blur-xl px-4 sm:gap-4 md:px-6 shadow-sm shadow-stone-neutral-8/5">
      <SidebarTrigger className="text-ocean-blue-11 hover:text-ocean-blue-9 hover:bg-ocean-blue-2 transition-colors rounded-lg p-2" />
      <Separator orientation="vertical" className="h-6 mx-2 bg-stone-neutral-4" />
      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm font-medium text-stone-neutral-11 hidden sm:inline-flex bg-stone-neutral-3 px-3 py-1 rounded-full border border-stone-neutral-4 shadow-sm">
          Dashboard View
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Link to="/dashboard/profile" className="flex items-center gap-2 hover:bg-stone-neutral-3 p-2 rounded-full transition-all duration-200">
          <UserCircle className="w-6 h-6 text-ocean-blue-10" />
        </Link>
      </div>
    </header>
  );
};
