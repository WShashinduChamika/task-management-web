import { useSignals } from "@preact/signals-react/runtime";
import { ClipboardList, UserCircle } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    href: "/dashboard/tasks",
    label: "Tasks",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserCircle,
  },
] as const;

export const SidebarNav = () => {
  useSignals();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider text-ocean-blue-8 mb-2 px-2">
        Features
      </SidebarGroupLabel>

      <SidebarMenu className="gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                isActive={isActive}
                onClick={() => navigate(href)}
                className={`flex items-center gap-3 px-3 py-5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-ocean-blue-9 text-white font-semibold shadow-md shadow-ocean-blue-9/20 hover:bg-ocean-blue-10 hover:text-white"
                    : "text-stone-neutral-11 hover:bg-ocean-blue-2 hover:text-ocean-blue-11 font-medium"
                }`}
              >
                <Icon
                  className={`size-5 shrink-0 ${isActive ? "text-ocean-blue-8" : "text-ocean-blue-9"}`}
                />
                <span className="text-base">{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
