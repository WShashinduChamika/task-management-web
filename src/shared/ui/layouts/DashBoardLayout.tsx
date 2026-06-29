import { useSignals } from "@preact/signals-react/runtime";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "../../../components/ui/sidebar";
import { AppHeader } from "../navigations/AppHeader";
import { SidebarNav } from "../navigations/SideBarNav";
import { authUserStore } from "@/modules/auth/store/auth.store";
import { clearAuthStorage } from "@/core/storage/auth.storage";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardLayout = () => {
  useSignals();
  const navigate = useNavigate();
  const user = authUserStore.value;

  const handleLogout = () => {
    clearAuthStorage();
    authUserStore.value = null;
    navigate("/login");
  };

  const getInitials = () => {
    if (!user) return "U";
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  };

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-stone-neutral-4 shadow-xl bg-white/95 backdrop-blur-xl flex flex-col">
        <SidebarHeader className="border-b border-stone-neutral-4 px-6 py-6 shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-ocean-blue-9 to-primary bg-clip-text text-transparent drop-shadow-sm">
              Task Flow
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4 flex-1">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-stone-neutral-4 bg-stone-neutral-2/50 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white shadow-sm border border-stone-neutral-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex shrink-0 items-center justify-center size-9 rounded-full bg-ocean-blue-9 text-white font-bold text-sm shadow-sm">
                {getInitials()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-primary truncate max-w-[120px]">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-secondary-foreground truncate max-w-[120px]">
                  {user?.role || "User"}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-stone-neutral-11 hover:text-destructive hover:bg-destructive/10 rounded-lg shrink-0"
              title="Logout"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </SidebarFooter>
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
