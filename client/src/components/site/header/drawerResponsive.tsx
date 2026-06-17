import { logout } from "@/api/site/auth.api";
import { useUI } from "@/context/UIContext";
import { useUser } from "@/context/userContext";
import { useListCategories } from "@/hooks/site/useListCategories";
import { ChevronRight, CreditCard, LogOutIcon, MapPin, Package, UserIcon } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { Loading } from "../loading/loading";
import { SheetSearch } from "../../ui/sheet";

const accountLinks = [{ label: "Meus pedidos", to: "/pedidos", icon: Package }];

const personalLinks = [
  { label: "Meus endereços", to: "/meus-enderecos", icon: MapPin },
  { label: "Meus cartões", to: "/cartoes-salvos", icon: CreditCard },
];

export function DrawerResponsive() {
  const { data: categories } = useListCategories();
  const { openDrawer, setOpenDrawer, setModalAuth, setOpenFavorite } = useUI();
  const { name, setEmail, setLastName, setTel, setName } = useUser();
  const { pathname } = useLocation();

  const closeDrawer = () => setOpenDrawer(false);

  const logOut = async () => {
    const response = await logout();
    if (response.status === 200) {
      setName(null);
      setEmail(null);
      setLastName(null);
      setTel(null);
    }
  };

  return (
    <SheetSearch open={openDrawer} onOpenChange={setOpenDrawer} side="left" tittle={name ? `Olá ${name}` : "Menu"}>
      <section className="pb-6">
        <h3 className="mb-2 text-xs font-semibold uppercase text-gray-400">Categorias</h3>
        {categories ? (
          <div className="divide-y divide-gray-100 overflow-hidden rounded-md border border-gray-100">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/pesquisa?category=${category.name}`}
                onClick={closeDrawer}
                className="block w-full px-3 py-3 text-base font-medium capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100"
              >
                {category.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-28 items-center justify-center">
            <Loading />
          </div>
        )}
      </section>

      <section className="border-t border-gray-100 pt-5 pb-3">
        <h3 className="mb-3 text-xs font-semibold uppercase text-gray-400">Minha conta</h3>
        <div className="flex flex-col gap-2">
          {accountLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeDrawer}
              className={`flex items-center justify-between rounded-md border px-3 py-3 text-sm transition-colors ${
                pathname === to ? "border-primary-50 bg-[#F4EDE7] text-primary-400" : "border-gray-100 text-gray-700 hover:border-primary-50/40 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {label}
              </span>
              <ChevronRight size={16} />
            </Link>
          ))}

          <button
            onClick={() => {
              closeDrawer();
              setOpenFavorite(true);
            }}
            className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-3 text-sm text-gray-700 transition-colors hover:border-primary-50/40 hover:bg-gray-50"
          >
            <span className="flex items-center gap-3">
              <IoMdHeartEmpty size={18} />
              Favoritos
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <section className="border-t border-gray-100 pt-5 pb-6">
        <h3 className="mb-3 text-xs font-semibold uppercase text-gray-400">Informações pessoais</h3>
        <div className="flex flex-col gap-2">
          {personalLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeDrawer}
              className={`flex items-center justify-between rounded-md border px-3 py-3 text-sm transition-colors ${
                pathname === to ? "border-primary-50 bg-[#F4EDE7] text-primary-400" : "border-gray-100 text-gray-700 hover:border-primary-50/40 hover:bg-gray-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {label}
              </span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 pt-4 pb-2">
        {name !== null ? (
          <button
            onClick={() => {
              closeDrawer();
              logOut();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <LogOutIcon size={16} />
            Sair
          </button>
        ) : (
          <button
            onClick={() => {
              closeDrawer();
              setModalAuth(true);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-50 px-4 py-3 text-sm font-medium text-white hover:bg-primary-100"
          >
            <UserIcon size={17} />
            Entrar ou cadastrar
          </button>
        )}
      </section>
    </SheetSearch>
  );
}
