import { Stamps } from "@/components/ui/stamps";
import { SuggestionProduct } from "@/components/site/product/suggestions";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { filterProductByCategory } from "@/utils/productsUtild";

export function Home() {
  const { data: products } = useAllProducts();

  const vestidos = filterProductByCategory("Vestido", products ?? []);

  return (
    <main>
      <section>
        <img src="images/bannerHome.webp" alt="" className="w-full object-cover" />
      </section>
      <Stamps />

      <section className="mt-5 ">
        <SuggestionProduct suggestionProducts={vestidos} tittle="Melhores preços" />
      </section>

      <section className="mt-20">
        <SuggestionProduct suggestionProducts={vestidos} tittle="Vestidos que falam por você" />
      </section>
      {/* <Questions /> */}
    </main>
  );
}
