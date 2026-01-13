
import { Stamps } from "@/components/home/stamps";
import { SuggestionProduct } from "@/components/product/suggestions";
import { useAllProducts } from "@/hooks/useAllProducts";
import { filterProductByCategory } from "@/utils/productsUtild";

export function Home() {
  const { data: products } = useAllProducts();


  const vestidos = filterProductByCategory("Vestido", products ?? []) ;

  return (
    <main>
      <section>
        <img src="images/bannerHome.webp" alt="" className="h-180 w-full object-cover" />
      </section>
      <Stamps />

      <section className="mt-15 ">
        <div className="flex justify-between  items-center px-6 2xl:px-0  mx-auto max-w-[1450px] w-full">
          <h2 className="text-5xl max-w-xl leading-14  mb-10 font-semibold text-gray-900">
            PEÇAS <span className="text-primary-50">ÚNICAS</span> FASHION <br></br> COLEÇÃO
          </h2>

          <div className="flex flex-col h-50 justify-around">
            <div className="flex flex-col justify-end pb-4">
              <h3 className="text-end mb-2 font-semibold">PEÇAS SELECIONADAS</h3>
              <p className="max-w-xs text-end leading-5 text-gray-700"> Peças únicas, com estilo e história, esperando por um novo começo.</p>
            </div>
          </div>
        </div>
        <SuggestionProduct suggestionProducts={vestidos} />
      </section>

      <section className="mt-32 flex justify-center items-center">
        <div className="mx-auto max-w-[1450px] w-full">
          <p className="text-2xl font-semibold mb-3 text-gray-800 px-4 2xl:px-0">Vestidos que falam por você</p>
          <SuggestionProduct suggestionProducts={vestidos} />
        </div>
      </section>
      {/* <Questions /> */}
    </main>
  );
}
