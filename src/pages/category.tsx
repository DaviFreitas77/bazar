import { BreadcrumbPages } from "@/components/ui/breadcrumb";
import {
  getProducts,
  searchProducts,
  filterColorsProducts,
} from "@/utils/productsUtild";
import { CardProduct } from "@/components/ui/card";
import { BsGrid, BsGrid1X2 } from "react-icons/bs";
import { useMemo, useState } from "react";
import { AccordionFilter } from "@/components/ui/accordion";
import { useSearchParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiArrowRight } from "react-icons/fi";
export function Category() {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);
  let productsPerPage = 16;

  const products = useMemo(() => {
    if (search) {
      return searchProducts(search);
    } else {
      return getProducts();
    }
  }, [search]);

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //cores do produto para filtro
  const allColors = [
    ...new Set(currentItems.flatMap((product) => product.color)),
  ];

  return (
    <main className="px-6 flex flex-col gap-6">
      <section className="flex gap-6 justify-center ">
        {/* Sidebar */}
        <section className="max-w-xs w-full h-screen rounded-md mt-10">
          <section className="w-full max-w-7xl">
            <BreadcrumbPages />

            <AccordionFilter name="Cores">
              {allColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black mt-1"
                >
                  <input
                    type="checkbox"
                    value={color}
                    className="accent-black w-4 h-4"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </AccordionFilter>
          </section>
        </section>

        {/* Conteúdo principal */}
        <div className="w-full flex flex-col  max-w-[1300px] items-center">
          {/* Banner */}
          <section className="bg-gray-100 h-80 flex items-center justify-center rounded-md w-full max-w-7xl mt-10">
            <h1 className="text-4xl">Banner</h1>
          </section>

          {/* Barra de ações */}
          <section className="flex w-full justify-between items-center mt-4 mb-2 max-w-7xl ">
            <div className="flex gap-2">
              <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition">
                <BsGrid />
              </button>
              <button className="bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition">
                <BsGrid1X2 />
              </button>
              <button className="bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition">
                Ordenar por
              </button>
            </div>
            <p className="underline underline-offset-4 text-sm">
              {products.length} Resultados
            </p>
          </section>

          {/* Grid de produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
            {currentItems.map((product) => (
              <CardProduct
                key={product.id}
                nameProduct={product.productName}
                tamanhos={product.sizes}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                imageUrl={product.image}
              />
            ))}
          </div>

          {currentItems.length === 0 ? (
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
          ) : (
            <div className="w-full flex justify-center mt-6">
              <div className="flex gap-4 items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Anterior
                </button>
                <span className="text-sm">
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
