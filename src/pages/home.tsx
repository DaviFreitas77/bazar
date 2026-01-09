import { SuggestionProduct } from "@/components/product/suggestions";
import { useAllProducts } from "@/hooks/useAllProducts";
import { filterProductByCategory } from "@/utils/productsUtild";

export function Home() {
  const { data: products, isLoading } = useAllProducts();
  if (isLoading || !products) return null;

  const vestidos = filterProductByCategory("Vestido", products);

  return (
    <main>
      <section>
        <img src="images/bannerHome.png" alt="" className="h-180 w-full object-cover" />
      </section>

      <section className="mt-8">
        <SuggestionProduct tittle="Vestidos cheios de personalidade" suggestionProducts={vestidos} />
      </section>
    </main>
  );
}
