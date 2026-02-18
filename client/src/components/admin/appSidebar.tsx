import { logout } from "@/api/site/auth.api";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { CiDiscount1 } from "react-icons/ci";
import { useUser } from "@/context/userContext";

import { Home, Settings, Mail } from "lucide-react";
import { GiClothes } from "react-icons/gi";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../site/loading/loading";

const menuGroups = [
  {
    label: "Gerenciamento",
    items: [
      {
        title: "Estatísticas",
        url: "/admin-dashboard",
        icon: Home,
        disabled: false,
      },
      {
        title: "Produtos",
        url: "/admin-produtos",
        icon: GiClothes,
        disabled: false,
      },
      {
        title: "Cupons",
        url: "/admin-produtos",
        icon: CiDiscount1,
        disabled: true,
      },
    ],
  },
  {
    label: "Comunicação",
    items: [
      {
        title: "Email ",
        url: "/admin-email",
        icon: Mail,
        disabled: true,
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
        disabled: true,
      },
    ],
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { setName, setEmail, setLastName, setTel, setRole } = useUser();
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true)
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
    } finally {
      setLoading(false)
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
                      {item.disabled ? (
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-2">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span className="text-base text-gray-400">{item.title}</span>
                          </div>
                          <span className="text-xs p-1 bg-amber-200 rounded-full">Em breve</span>
                        </div>
                      ) : (
                        <Link to={item.url}>
                          <item.icon className="mr-2 h-4 w-4" />

                          <span className="text-base">{item.title}</span>
                        </Link>
                      )}
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
                  <button onClick={logOut} title="Sair da conta" disabled={loading} className="cursor-pointer py-5 flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    
                    <span className="text-base ">{loading ? <Loading /> : 'Sair'}</span>
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
