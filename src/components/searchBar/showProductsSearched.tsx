import { useProductsSearched } from "@/context/productsSearchedContext";
import { CardProduct } from "../ui/card";
import { PackageX } from "lucide-react";
import { Link } from "react-router-dom";
export function ShowProductsSearched() {
  const { products, nameProduct } = useProductsSearched();

  const limitedProducts = products.slice(0, 6);

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 justify-center items-center">
        {limitedProducts.length > 0 ? (
          limitedProducts.map((item) => (
            <CardProduct
              key={item.id}
              nameProduct={item.productName}
              idProduct={item.id}
              currentPrice={item.currentPrice}
              imageUrl={item.image?.[0]}
              tamanhos={item.sizes}
            />
          ))
        ) : (
          <div className="col-span-2 flex flex-col gap-2 justify-center items-center min-h-48 text-primary-50">
            <PackageX size={48} className="opacity-70" />
            <p className="text-center text-lg font-medium text-gray-500">
              Nenhum produto encontrado
            </p>
          </div>
        )}
      </div>

      {limitedProducts.length > 0 && nameProduct && (
        <Link
          to={`/?q=${nameProduct}`}
          className="text-center border border-primary-50 hover:bg-primary-50 hover:text-white py-2 rounded-md transition-all duration-300 cursor-pointer font-medium"
        >
          Mostrar todos os produtos
        </Link>
      )}
    </section>
  );
}
