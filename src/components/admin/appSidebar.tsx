import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { Home, Settings, Mail } from "lucide-react";
import { GiClothes } from "react-icons/gi";
import { FaBox } from "react-icons/fa6";
import { Link } from "react-router-dom";

const menuGroups = [
  {
    label: "Gerenciamento",
    items: [
      {
        title: "Estatísticas",
        url: "/admin-dashboard",
        icon: Home,
      },
      {
        title: "Produtos",
        url: "/admin-produtos",
        icon: GiClothes,
      },
    ],
  },
  {
    label: "Comunicação",
    items: [
      {
        title: "Email",
        url: "/admin-email",
        icon: Mail,
      },
    ],
  },
  {
    label: "Configurações",
    items: [
      {
        title: "Configurações",
        url: "/config",
        icon: Settings,
      },
    ],
  },
];
export function AppSidebar() {
  return (
    <Sidebar className="border-gray-200 bg-white">
      <SidebarContent className="bg-white flex flex-col h-full">
        {/* Grupos normais */}
        {menuGroups.slice(0, 3).map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/logout">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="text-base">Sair</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
