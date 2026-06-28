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
      <Sidebar>
        <SidebarHeader>
          <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Task Manager
          </p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
