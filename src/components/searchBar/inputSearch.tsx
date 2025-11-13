import { useProductsSearched } from "@/context/productsSearchedContext";

export function InputSearch() {
  const { nameProduct,setNameProduct } = useProductsSearched();


  return (
    <input
      type="text"
      placeholder="Pesquisar"
      value={nameProduct || ''}
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
