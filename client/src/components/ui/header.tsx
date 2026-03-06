import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
// import { IoMdHeartEmpty } from "react-icons/io";
import { SheetSearch } from "./sheet";
import { PopularSearches } from "../site/searchBar/PopularSearches";
import { InputSearch } from "../site/searchBar/inputSearch";
import { ShowProductsSearched } from "../site/searchBar/showProductsSearched";
import { CartProducts } from "../site/shoppingCart/cartProducts";

import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import { useUI } from "@/context/UIContext";
import { DropdownUser } from "./dropdown-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { DrawerResponsive } from "../site/header/drawerResponsive";
import { useListCategories } from "@/hooks/site/useListCategories";
import { Link } from "react-router-dom";
import { useProductsSearched } from "@/context/productsSearchedContext";
import { useEffect, useState } from "react";
export function Header() {
  const { name } = useUser();
  const { state } = useCart();
  const { setOpenSearch, setOpenCart, setOpenFavorite, openSearch, openCart, openFavorite, setModalAuth, setOpenDrawer } = useUI();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { setNameProduct } = useProductsSearched();
  const { data: allCategories } = useListCategories();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`w-full border-b border-gray-200 bg-white fixed top-0 left-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >

      <aside className="bg-primary-50 text-white text-center py-2 text-xs tracking-wide" role="banner">
        RETIRE EM NOSSO BAZAR FÍSICO
      </aside>

      <div className="flex justify-center items-center h-20 bg-white">
        <div className="flex items-center justify-between max-w-[1500px] w-full px-7">

          {/* Botão hamburger (mobile) */}
          <button
            onClick={() => setOpenDrawer(true)}
            className="lg:hidden"
            aria-label="Abrir menu"
          >
            <RxHamburgerMenu size={22} />
          </button>

          {/* Logo */}
          <h1 className="sr-only">Bazar</h1>
          <a href="/" aria-label="Página inicial">
            <img src="/images/logo.png" alt="Logo Bazar" className="w-20 ml-10 lg:ml-0" />
          </a>


          <nav className="gap-8 text-sm hidden lg:flex" aria-label="Menu de categorias">
            {allCategories?.map((category) => (
              <Link
                key={category.id}
                onClick={() => setNameProduct(category.name)}
                className="hover:text-primary-50 text-gray-700 capitalize"
                to={`/pesquisa?category=${category.name}`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Pesquisa, conta, carrinho */}
          <div className="flex items-center gap-4 text-gray-800">

            <button
              onClick={() => setOpenSearch(true)}
              className="hover:text-primary-50 transition-colors cursor-pointer"
              aria-label="Pesquisar produtos"
            >
              <CiSearch size={22} />
            </button>


            <div className=" items-center gap-2 hidden lg:flex">
              <AiOutlineUser size={22} />
              {name ? (
                <DropdownUser name={name} />
              ) : (
                <div className="flex flex-col items-start leading-4">
                  <button className="text-gray-600 font-medium">Minha conta</button>
                  <div className="text-xs text-gray-500">
                    <span
                      onClick={() => setModalAuth(true)}
                      className="hover:text-primary-50 cursor-pointer"
                    >
                      Entrar
                    </span>{" "}
                    /{" "}
                    <span
                      onClick={() => setModalAuth(true)}
                      className="hover:text-primary-50 cursor-pointer"
                    >
                      Cadastre-se
                    </span>
                  </div>
                </div>
              )}
            </div>


            <button
              onClick={() => setOpenCart(true)}
              className="hover:text-primary-50 transition-colors relative cursor-pointer"
              aria-label="Abrir carrinho de compras"
            >
              <LiaShoppingBagSolid size={22} />
              <span className="absolute -top-2 -right-2 bg-primary-50 text-white text-[10px] font-semibold rounded-full px-[5px]">
                {state.length}
              </span>
            </button>
          </div>
        </div>
      </div>


      <SheetSearch open={openCart} onOpenChange={setOpenCart} side="right" tittle="Sacola">
        <CartProducts />
      </SheetSearch>
      <SheetSearch open={openFavorite} onOpenChange={setOpenFavorite} side="right" tittle="Favoritos" />
      <SheetSearch open={openSearch} onOpenChange={setOpenSearch} side="right" tittle="Buscar Produtos">
        <InputSearch />
        <PopularSearches />
        <ShowProductsSearched />
      </SheetSearch>

      <DrawerResponsive />
    </header>
  );
}
