import { useProductsSearched } from "@/context/productsSearcherContext";
import { CardProduct } from "../ui/card";

export function ShowProductsSearchded() {
  const { products } = useProductsSearched();
  const limitedProdutcts = products.splice(0, 6);
  return (
    <section className="grid grid-cols-2 gap-4">
      {limitedProdutcts.map((item) => (
        <CardProduct
          nameProduct={item.productName}
          idProduct={item.id}
          currentPrice={item.currentPrice}
          imageUrl={item.image[0]}
          tamanhos={item.sizes}
          key={item.id}
        />
      ))}
    </section>
  );
}
