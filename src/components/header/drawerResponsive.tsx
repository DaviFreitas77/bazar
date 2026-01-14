import { useUI } from "@/context/UIContext";
import { SheetSearch } from "../ui/sheet";
import { useListCategories } from "@/hooks/useListCategories";
import { AccordionFilter } from "../ui/accordion";
import { Link } from "react-router-dom";
import { useUser } from "@/context/userContext";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
export function DrawerResponsive() {
  const { data: categories } = useListCategories();
  const { openDrawer, setOpenDrawer, setOpenFavorite } = useUI();
  const { name } = useUser();
  return (
    <SheetSearch open={openDrawer} onOpenChange={setOpenDrawer} side="left" tittle={name ? `Olá ${name}` : "Menu"}>
      <AccordionFilter name="Categorias">
        {categories &&
          categories.map((category) => (
            <div>
              <Link to={`/pesquisa?q=${category.name}`} onClick={() => setOpenDrawer(false)} key={category.id} className="block mb-4 text-gray-700 hover:text-gray-900">
                {category.name}
              </Link>
            </div>
          ))}
      </AccordionFilter>

      <section className="absolute bottom-4 flex items-center gap-2 text-sm justify-evenly w-[90%] border-t border-gray-200 pt-5 pb-2 text-gray-700">
        <Link
          to="/pedidos"
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="flex items-center gap-1"
        >
          <BsBoxSeam size={17} />
          Pedidos
        </Link>

        <button
          onClick={() => {
            setOpenDrawer(false), setOpenFavorite(true);
          }}
          className="flex items-center gap-1"
        >
          <IoMdHeartEmpty size={18} />
          Wishlist
        </button>

        <Link
          to="/meus-enderecos"
          onClick={() => {
            setOpenDrawer(false);
          }}
          className="flex items-center gap-1.5 "
        >
          <CiLocationOn size={18} />
          Endereços
        </Link>
      </section>
    </SheetSearch>
  );
}
