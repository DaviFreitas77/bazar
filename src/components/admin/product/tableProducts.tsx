import { Pagination } from "@/components/site/search/pagination";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  previousPrice: number;
  currentPrice: number;
  discount: number;
  stock: number;
  category: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Produto 1",
    previousPrice: 150,
    currentPrice: 120,
    discount: 20,
    stock: 50,
    category: "Eletrônicos",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Produto 2",
    previousPrice: 80,
    currentPrice: 70,
    discount: 12.5,
    stock: 30,
    category: "Acessórios",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 7,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 8,
    name: "Produto 3",
    previousPrice: 200,
    currentPrice: 180,
    discount: 10,
    stock: 20,
    category: "Roupas",
    image: "https://via.placeholder.com/50",
  },
];

export function TableProduct() {

   let productsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

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


  
  return (
    <div className="mt-4 px-4 w-full pb-20">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Imagem</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Produto</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Anterior</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço Atual</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Desconto</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Stock</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Categoria</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-primary-50 font-bold">{product.id}</td>
              <td className="px-4 py-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 line-through text-gray-400">R$ {product.previousPrice.toFixed(2)}</td>
              <td className="px-4 py-2 font-semibold text-[#A2785A]">R$ {product.currentPrice.toFixed(2)}</td>
              <td className="px-4 py-2">{product.discount}%</td>
              <td className="px-4 py-2">{product.stock}</td>
              <td className="px-4 py-2">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </div>
  );
}
