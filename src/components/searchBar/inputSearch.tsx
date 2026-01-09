import { useProductsSearched } from "@/context/productsSearchedContext";
import { SearchIcon } from "lucide-react";

export function InputSearch() {
  const { nameProduct, setNameProduct } = useProductsSearched();
  return (
    <div className="relative mt-5 w-[90%]">
      <SearchIcon size={18} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

      <input
        type="text"
        placeholder="O que você está procurando?"
        value={nameProduct || ""}
        onChange={(e) => setNameProduct(e.target.value)}
        className="
            w-full
            outline-none
            ring-1
            ring-gray-200
            focus:ring-primary-50
            py-2
            pl-10
            pr-2
            text-sm
            rounded-xl
            border
            border-gray-200
            transition-all
            duration-200
          "
      />
    </div>
  );
}
