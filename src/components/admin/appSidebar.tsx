import { logout } from "@/api/site/auth.api";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useUser } from "@/context/userContext";

import { Home, Settings, Mail } from "lucide-react";
import { GiClothes } from "react-icons/gi";

import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { setName, setEmail, setLastName, setTel, setRole } = useUser();

  const logOut = async () => {
    try {
      await logout();

      localStorage.removeItem("token");

      setName(null);
      setEmail(null);
      setLastName(null);
      setTel(null);
      setRole(null);
      localStorage.removeItem("token");

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
                  <button onClick={logOut} className="cursor-pointer py-5">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="text-base">Sair</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
