import { useProductsSearched } from "@/context/productsSearcherContext";
import { searchProducts } from "@/utils/productsUtild";
import { useMemo, useState } from "react";

export function InputSearch() {
  const [search, setSearch] = useState<string>("");
  const { setProducts } = useProductsSearched();

  const memoizedResults = useMemo(() => {
    return searchProducts(search);
  }, [search]);

  setProducts(memoizedResults);

  return (
    <input
      type="text"
      placeholder="Pesquisar"
      onChange={(e) => setSearch(e.target.value)}
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
