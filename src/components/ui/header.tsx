import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { SheetSearch } from "./sheet";
import {useState } from "react";
import { PopularSearches } from "../searchBar/PopularSearches";
import { InputSearch } from "../searchBar/inputSearch";
import { ShowProductsSearched } from "../searchBar/showProductsSearched";
import { CartProducts } from "../shoppingCart/cartProducts";
import { ModalAuth } from "../auth/modalAuth";
import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";
import { useUI } from "@/context/UIContext";
import { Link } from "react-router-dom";
import { DropdownUser } from "./dropdown-menu";
export function Header() { 
  const [showModal, setShowModal] = useState<boolean>(false);
 const { name } = useUser();
 const {state} = useCart()
 const {setOpenSearch,setOpenCart,setOpenFavorite,openSearch,openCart,openFavorite} = useUI();

 
  return (
    <header className="w-full border-b border-gray-200 shadow-sm">
      <section className="bg-primary-50 text-white text-center py-2 text-sm tracking-wide">
        Frete grátis em pedidos acima de R$299
      </section>

      {/* Header principal */}
      <section className="flex justify-center items-center h-20 bg-white">
        <div className="flex items-center justify-between max-w-[1500px] w-full px-7">
          {/* LOGO */}
          <span className="text-2xl font-semibold tracking-wide text-gray-800 cursor-pointer">
            Logo
          </span>

          <div className="flex items-center gap-4 text-gray-800">
            {/* Pesquisa */}
            <button
              onClick={() => setOpenSearch(true)}
              className="hover:text-primary-50 transition-colors"
              title="Pesquisar"
            >
              <CiSearch size={22} />
            </button>

            {/* Conta */}
            <div className="flex items-center gap-2  transition-colors cursor-pointer">
              <AiOutlineUser size={22} />
              {name ? (
                <div className="mt-1">
                  <DropdownUser name={name}/>
                 
                  {/* <Link to={"/pedidos"} className="capitalize text-sm">Meus pedidos</Link> */}
                </div>
              ) : (
                <div className="leading-4 flex flex-col items-start">
                  <button className="text-gray-600 font-medium">
                    Minha conta
                  </button>
                  <button className="text-xs text-gray-500">
                    <span
                      onClick={() => setShowModal(true)}
                      className="hover:text-primary-50 cursor-pointer"
                    >
                      Entrar
                    </span>{" "}
                    /{" "}
                    <span
                      onClick={() => setShowModal(true)}
                      className="hover:text-primary-50 cursor-pointer"
                    >
                      Cadastre-se
                    </span>{" "}
                  </button>
                </div>
              )}
            </div>

            {/* Favoritos */}
            <button
              onClick={() => setOpenFavorite(true)}
              className="hover:text-primary-50 transition-colors"
              title="Favoritos"
            >
              <IoMdHeartEmpty size={22} />
            </button>

            {/* Sacola */}
            <button
              onClick={() => setOpenCart(true)}
              className="hover:text-primary-50 transition-colors relative"
              title="Sacola"
            >
              <LiaShoppingBagSolid size={22} />
              {/* Badge da sacola */}
              <span className="absolute -top-2 -right-2 bg-primary-50 text-white text-[10px] font-semibold rounded-full px-[5px]">
                {state.length}
              </span>
            </button>
          </div>
        </div>
      </section>

      <SheetSearch
        open={openCart}
        onOpenChange={setOpenCart}
        side="right"
        tittle="Carrinho"
      >
        <CartProducts />
      </SheetSearch>

      <SheetSearch
        open={openFavorite}
        onOpenChange={setOpenFavorite}
        side="right"
        tittle="Favoritos"
      />

      <SheetSearch

        open={openSearch}
        onOpenChange={setOpenSearch}
        side="right"
        tittle=""
      >
        <InputSearch />

        <PopularSearches />

        <ShowProductsSearched />
      </SheetSearch>

      <ModalAuth open={showModal} onClose={() => setShowModal(false)} />
    </header>
  );
}
