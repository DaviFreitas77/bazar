import { useProductsSearched } from "@/context/productsSearchedContext";
import { CardProduct } from "../../ui/cardProduct";
import { PackageX } from "lucide-react";
import { Link } from "react-router-dom";
import { Loading } from "../loading/loading";
import { CiSearch } from "react-icons/ci";
import { useUI } from "@/context/UIContext";
import { hookSearchParams } from "@/hooks/site/useSearchParams";

export function ShowProductsSearched() {
  const { nameProduct } = useProductsSearched();
  const { data: productsSearched, isLoading } = hookSearchParams(nameProduct);
  const limitedProducts = productsSearched?.slice(0, 6) ?? [];
  const { setOpenSearch } = useUI();

  if (isLoading && nameProduct) {
    return (
      <div className="col-span-2 flex justify-center items-center min-h-[80vh]">
        <Loading />
      </div>
    );
  }

  if (!nameProduct) {
    return (
      <div className="col-span-2 flex flex-col justify-center items-center min-h-[80vh] text-gray-500">
        <CiSearch size={100} className="mb-4 opacity-10" />
        <p className="text-center text-lg font-medium mb-2">O que você está procurando?</p>
        <p className="text-center text-sm text-gray-400">Digite acima ou use os termos mais buscados</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 ">
      <div className="grid grid-cols-2 gap-2 justify-center items-center mt-4">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((item) => <CardProduct key={item.id} name={item.name} id={item.id} price={item.price} image={item.image?.[0]} sizes={item.sizes} />)
        ) : (
          <div className="col-span-2 flex flex-col gap-2 justify-center items-center min-h-48 text-primary-50 h-[80vh]">
            <PackageX size={48} className="opacity-70" />
            <p className="text-center text-lg font-medium text-gray-500">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {limitedProducts.length > 0 && nameProduct && (
        <Link to={`/pesquisa?q=${nameProduct}`} onClick={() => setOpenSearch(false)} className="text-center border border-primary-50 hover:bg-primary-50 hover:text-white py-2 rounded-md transition-all duration-300 cursor-pointer font-medium  ">
          Mostrar todos os produtos
        </Link>
      )}
    </section>
  );
}
