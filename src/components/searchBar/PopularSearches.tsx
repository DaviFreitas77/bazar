import { useProductsSearched } from "@/context/productsSearchedContext";

export function PopularSearches() {
  const { setNameProduct } = useProductsSearched()
  return (
    <section>
      <h2 className="mt-4 text-base text-gray-900">Termos mais buscados</h2>
      <div className="flex items-center gap-2 mt-2">
        <button 
        onClick={()=>setNameProduct("Vestido")}
        className="bg-primary-50/30 px-10 rounded-full py-2 text-sm hover:bg-primary-50/50 cursor-pointer">
          Vestido
        </button>
        <button 
        onClick={()=>setNameProduct("Calça")}
        className="bg-primary-50/30 px-10 rounded-full py-2 text-sm hover:bg-primary-50/50 cursor-pointer">
          Calça
        </button>
     
      </div>
    </section>
  );
}
