import { useProductsSearched } from "@/context/productsSearchedContext";

export function PopularSearches() {
  const { setNameProduct } = useProductsSearched()
  return (
    <section>
      <h2 className="mt-4 text-base text-gray-900">Termos mais buscados</h2>
      <div className="flex items-center gap-2 mt-2">
        <button 
        onClick={()=>setNameProduct("Vestido")}
        className=" px-6 rounded-full py-2 text-sm bg-primary-50 
        text-white  cursor-pointer hover:opacity-90">
          Vestido
        </button>
        <button 
        onClick={()=>setNameProduct("Calça")}
        className="bg-primary-50 
        text-white px-6 rounded-full py-2 text-sm  cursor-pointer hover:opacity-90">
          Calça
        </button>
     
      </div>
    </section>
  );
}
