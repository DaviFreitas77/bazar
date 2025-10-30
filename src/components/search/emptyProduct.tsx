
import { CiSearch } from "react-icons/ci";
import { FiArrowRight } from "react-icons/fi";
interface EmptyProductProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    setSearchParams: (params: Record<string, string>) => void;
  
}
export function EmptyProduct({inputValue,setInputValue,setSearchParams}:EmptyProductProps){
    return(
         <div className="w-full max-w-2xl  mt-20">
              <p className="text-center  text-2xl font-medium">
                Nenhum produto encontrado
              </p>
              <p className="text-gray-600 mb-4 mt-2 text-center">
                Não conseguimos encontrar produtos que correspondam à sua
                pesquisa.
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full  p-3 pl-8 rounded-sm bg-gray-100/40 outline-none "
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="absolute top-4 left-2">
                  <CiSearch />
                </div>
                <button
                  onClick={() => setSearchParams({ q: inputValue })}
                  className="absolute top-4 right-2 z-999 cursor-pointer"
                >
                  <FiArrowRight />
                </button>
              </div>
            </div>
    )
}