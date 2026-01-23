import { Pagination } from "@/components/site/search/pagination";
import { DropDown, NativeSelectOption } from "@/components/ui/native-select";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

export function TableProduct() {
  const [filterOrder, setFilterOrder] = useState("relevance");

  let productsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products } = useAllProducts();

  const filteredProducts = useMemo(() => {
    let result = [...products ?? []];

    switch (filterOrder) {
      case "relevance":
        result.sort((a, b) => b.id - a.id);
        break;

      case "highestPrice":
        result.sort((a, b) => b.price - a.price);
        break;

      case "lowestPrice":
        result.sort((a, b) => a.price - b.price);
        break;

      default:
        return result;
    }

    return result;
  }, [filterOrder]);

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;

  const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = filteredProducts && Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (totalPages && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  console.log(products);

  return (
    <main className="mt-4  w-full pb-20">
      <section className="w-full  pt-4 my-4">
        <div className="text-end w-full flex justify-between  text-sm gap-4">
           <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder}>
          <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
          <NativeSelectOption value="highestPrice">Maior preço</NativeSelectOption>
          <NativeSelectOption value="lowestPrice">Menor Preço</NativeSelectOption>
        </DropDown>

         <Link to="/admin/novo-produto" className="bg-primary-50 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer">
            <AiOutlinePlus size={15} />
            Novo produto
          </Link>
        </div>
      </section>
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 ">
        <thead className="bg-primary-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Produto</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Anterior</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Atual</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoria</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-primary-50 font-bold">{product.id}</td>

              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 line-through text-gray-400">R$ {Number(product.lastPrice).toFixed(2)} </td>
              <td className="px-4 py-2 font-semibold text-[#A2785A]">R$ {Number(product.price).toFixed(2)}</td>
              <td className="px-4 py-2">{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">{totalPages && <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />}</div>
    </main>
  );
}
