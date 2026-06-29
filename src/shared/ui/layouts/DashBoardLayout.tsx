import { useSignals } from "@preact/signals-react/runtime";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "../../../components/ui/sidebar";
import { AppHeader } from "../navigations/AppHeader";
import { SidebarNav } from "../navigations/SideBarNav";

export const DashboardLayout = () => {
  useSignals();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-stone-neutral-4 shadow-xl bg-white/95 backdrop-blur-xl">
        <SidebarHeader className="border-b border-stone-neutral-4 px-6 py-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-ocean-blue-9 to-primary bg-clip-text text-transparent drop-shadow-sm">
              Task Flow
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="bg-stone-neutral-2">
        <AppHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8 relative">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
