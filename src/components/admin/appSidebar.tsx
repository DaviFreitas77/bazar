import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { Home, Settings, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Produto",
    url: "/",
    icon: Home,
  },
  {
    title: "Pedidos",
    url: "/lista-pedidos",
    icon: Home,
  },
  {
    title: "Email",
    url: "/broadcast",
    icon: Mail,
  },
  {
    title: "Estatiscas",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-gray-200 bg-white">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>BAZAR</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
