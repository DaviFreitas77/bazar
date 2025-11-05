import { useProductsSearched } from "@/context/productsSearchedContext";
import { searchProducts } from "@/utils/productsUtild";
import { useMemo } from "react";

export function InputSearch() {
  const { nameProduct,setNameProduct,setProducts } = useProductsSearched();

  const memoizedResults = useMemo(() => {
    return searchProducts(nameProduct);
  }, [nameProduct]);

  setProducts(memoizedResults);

  return (
    <input
      type="text"
      placeholder="Pesquisar"
      value={nameProduct}
      onChange={(e) => setNameProduct(e.target.value)}
      className="
            w-[90%]
            outline-none
            ring-1
            ring-gray-200
            focus:ring-primary-50
            py-2
            px-2
            text-sm
            rounded-md
            border
            border-gray-200
            transition-all
            duration-200
            
          "
    />
  );
}
