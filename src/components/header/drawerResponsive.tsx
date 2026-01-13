import { useUI } from "@/context/UIContext";
import { SheetSearch } from "../ui/sheet";
import { useListCategories } from "@/hooks/useListCategories";
import { AccordionFilter } from "../ui/accordion";
import { Link } from "react-router-dom";
import { useUser } from "@/context/userContext";
import { CiLogout } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
export function DrawerResponsive() {
  const { data: categories } = useListCategories();
  const { openDrawer, setOpenDrawer, setOpenSearch, setModalAuth, setOpenFavorite } = useUI();
  const { name } = useUser();
  return (
    <SheetSearch open={openDrawer} onOpenChange={setOpenDrawer} side="left" tittle={name ? `Olá ${name}` : "Menu"}>
      <AccordionFilter name="Categorias">
        {categories &&
          categories.map((category) => (
            <div>
              <Link to={`/pesquisa?q=${category.name}`} onClick={()=>setOpenDrawer(false)} key={category.id} className="block mb-4 text-gray-700 hover:text-gray-900">
                {category.name}
              </Link>
            </div>
          ))}
      </AccordionFilter>

      <button
        onClick={() => {
          setOpenDrawer(false), setOpenSearch(true);
        }}
        className=" font-semibold text-gray-800  text-start border-b border-gray-200 pb-2 mt-2 flex items-center gap-2 text-sm"
      >
        <CiSearch size={20} />
        Buscar produto
      </button>

      <button
        onClick={() => {
          setOpenDrawer(false), setOpenFavorite(true);
        }}
        className=" font-semibold text-gray-800  text-start border-b border-gray-200 pb-2 mt-5 flex items-center gap-2 text-sm"
      >
        <IoMdHeartEmpty size={20} />
        Meus favoritos
      </button>
      <Link
        to="/pedidos"
        onClick={() => {
          setOpenDrawer(false);
        }}
        className=" font-semibold text-gray-800  text-start border-b border-gray-200 pb-2 mt-5 flex items-center gap-2 text-sm"
      >
        <BsBoxSeam size={17} />
        Meus pedidos
      </Link>
      <Link
        to="/meus-enderecos"
        onClick={() => {
          setOpenDrawer(false);
        }}
        className=" font-semibold text-gray-800  text-start border-b border-gray-200 pb-2 mt-5 flex items-center gap-2 text-sm"
      >
        <CiLocationOn size={20} />
        Meus endereços
      </Link>

      {name == null ? (
        <div className="flex items-center gap-2  transition-colors cursor-pointer absolute bottom-4">
          <div className="leading-4 flex flex-col items-start">
            <button className=" text-gray-500">
              <span
                onClick={() => {
                  setOpenDrawer(false), setModalAuth(true);
                }}
                className="hover:text-primary-50 cursor-pointer"
              >
                Entrar
              </span>{" "}
              /{" "}
              <span
                onClick={() => {
                  setOpenDrawer(false), setModalAuth(true);
                }}
                className="hover:text-primary-50 cursor-pointer"
              >
                Cadastre-se
              </span>{" "}
            </button>
          </div>
        </div>
      ) : (
        <button className="absolute bottom-4 flex items-center gap-2 text-sm text-red-500">
          <CiLogout size={20} />
          Sair
        </button>
      )}
    </SheetSearch>
  );
}
