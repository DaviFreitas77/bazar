import { deleteProduct } from "@/api/admin/productAdmin";
import { Pagination } from "@/components/site/search/pagination";
import { DropDown, NativeSelectOption } from "@/components/ui/native-select";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { Pencil, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ModalEditProduct } from "./modalEditProduct";
import { Loading } from "@/components/site/loading/loading";

export function TableProduct() {
  const [filterOrder, setFilterOrder] = useState("relevance");
  const [productId, setProductId] = useState<number>(0);
  const [loadingButton, setLoadingButton] = useState(false);
  const [modeEdit, setModeEdit] = useState<boolean>(false);

  let productsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: products, refetch } = useAllProducts();



  const filteredProducts = useMemo(() => {
    let result = [...(products ?? [])];

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
  }, [filterOrder, products]);

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

  const delProduct = async (id: number) => {
    setLoadingButton(true);
    try {
      await deleteProduct(id);
      toast.success("Produto deletado com sucesso!");
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <main className="mt-4  w-full pb-20 ">
      <section className="bg-white  px-4 rounded-md pb-4 relative border border-gray-200">
        <div className="w-full  pt-4 my-4">
          <div className="text-end w-full flex justify-between  text-sm gap-4">
            <div className="flex  gap-10 relative">
              <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder}>
                <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
                <NativeSelectOption value="highestPrice">Maior preço</NativeSelectOption>
                <NativeSelectOption value="lowestPrice">Menor Preço</NativeSelectOption>
              </DropDown>

              {/* <input type="text" placeholder="Buscar produtos..." className="border border-gray-300 rounded-lg w-100 pl-8 text-sm outline-none focus:ring-1 focus:ring-primary-50" />
              <Search className="absolute left-45 top-1/2 -translate-y-1/2 text-gray-400" size={18} /> */}
            </div>
            <Link to="/admin/novo-produto" className="bg-primary-50 text-white px-4 rounded-md flex items-center gap-2 cursor-pointer">
              <AiOutlinePlus size={15} />
              Novo produto
            </Link>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200 ">
            <thead className="bg-primary-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Foto</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Produto</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Anterior</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Atual</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoria</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Modelo</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 ">
              {currentItems.length > 0 ? currentItems?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-primary-50 font-bold">{product.id}</td>
                  <td className="py-2">

                    <img
                      src={product.image[0]}
                      alt=""
                      className="w-20 h-20 object-cover rounded-md border border-gray-200"
                    />

                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 line-through text-gray-400">
                    {
                      Number(product.lastPrice) > 0
                        ? Number(product.lastPrice).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                        : <p>-</p>
                    }

                  </td>
                  <td className="px-4 py-2 font-semibold text-[#A2785A] ">
                    {Number(product.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-4 py-2">{product.category.name}</td>
                  <td className="px-4 py-2">{product.category.name}</td>
                  <td className="px-4 py-2">
                    <div className="flex  items-center ">
                      <button
                        title="Excluir produto"
                        onClick={() => delProduct(product.id)}
                        disabled={loadingButton}
                        className="p-2 rounded-md hover:bg-red-50 transition"
                      >
                        <Trash size={18} className="text-red-500" />
                      </button>

                      <button
                        onClick={() => {
                          setProductId(product.id);
                          setModeEdit(true);
                        }}
                        title="Editar produto"
                        className="p-2 rounded-md hover:bg-gray-100 transition"
                      >
                        <Pencil size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    <Loading />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>{totalPages && <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />}</div>
      </section>

      <section>{modeEdit && <ModalEditProduct productId={productId} onClose={() => setModeEdit(false)} />}</section>
    </main>
  );
}
