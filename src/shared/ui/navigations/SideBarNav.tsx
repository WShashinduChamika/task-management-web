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
      <SidebarGroupLabel>Feautures</SidebarGroupLabel>

      <SidebarMenu>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                isActive={isActive}
                onClick={() => navigate(href)}
              >
                <Icon className="size-4 shrink-0" />
                <span>{label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
