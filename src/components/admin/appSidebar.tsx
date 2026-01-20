import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { Home, Settings, Mail } from "lucide-react";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";

const menuGroups = [
  {
    label: "Gerenciamento",
    items: [
      {
        title: "Produtos",
        url: "/",
        icon: Home,
      },
      {
        title: "Pedidos",
        url: "/lista-pedidos",
        icon: GiClothes ,
      },
      {
        title: "Estatísticas",
        url: "/dashboard",
        icon: Home,
      },
    ],
  },
  {
    label: "Comunicação",
    items: [
      {
        title: "Email",
        url: "/broadcast",
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
      <SidebarContent className="bg-white">
        {menuGroups.map((group) => (
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
      </SidebarContent>
    </Sidebar>
  );
}
