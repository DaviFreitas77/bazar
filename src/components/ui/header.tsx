import { AiOutlineUser } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { SheetSearch } from "./sheet";
import { useState } from "react";
import { PopularSearches } from "../searchBar/PopularSearches";
import { InputSearch } from "../searchBar/inputSearch";
import { ShowProductsSearchded } from "../searchBar/showProductsSearched";

export function Header() {
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openFavorite, setOpenFavorite] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

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

          {/* Ações */}
          <div className="flex items-center gap-8 text-gray-800">
            {/* Pesquisa */}
            <button
              onClick={() => setOpenSearch(true)}
              className="hover:text-primary-50 transition-colors"
              title="Pesquisar"
            >
              <CiSearch size={22} />
            </button>

            {/* Conta */}
            <div className="flex items-center gap-2 hover:text-primary-50 transition-colors cursor-pointer">
              <AiOutlineUser size={22} />
              <div className="leading-4">
                <p className="text-gray-600 font-medium">Minha conta</p>
                <p className="text-xs text-gray-500">Entrar / Cadastre-se</p>
              </div>
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
                2
              </span>
            </button>
          </div>
        </div>
      </section>
      <SheetSearch
         widthSheet={400} 
        open={openCart}
        onOpenChange={setOpenCart}
        side="right"
        tittle="Carrinho"
      />

      <SheetSearch
          widthSheet={400} 
        open={openFavorite}
        onOpenChange={setOpenFavorite}
        side="right"
        tittle="Favoritos"
      />

      <SheetSearch
         widthSheet={500} 
        open={openSearch}
        onOpenChange={setOpenSearch}
        side="right"
        tittle=""
      >
        <InputSearch />

        <PopularSearches />

        <h3 className="mt-4  text-gray-900">Produtos sugeridos</h3>
        <ShowProductsSearchded />
      </SheetSearch>
    </header>
  );
}
