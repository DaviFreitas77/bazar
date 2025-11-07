import { useLocation, useParams } from "react-router-dom";
import { AccordionFilter } from "@/components/ui/accordion";
import { SuggestionProduct } from "@/components/product/suggestions";
import { useProductById, useProductsByCategory } from "@/api/products.api";
import type { Product } from "@/@types/product";
import { LoadingPage } from "@/components/loading/loadingPage";
import { useEffect } from "react";

export function Product() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Reseta scroll para o topo
  }, [pathname]);
  const { id } = useParams();
  const numberId = Number(id);

  const { data: product, isLoading: isLoadingProduct, } = useProductById(numberId);

  const { data: recomendation } = useProductsByCategory(product?.category ?? null);


  return (
    <main className="flex flex-col items-center justify-center py-10 min-h-screen">
      {isLoadingProduct ? (
        <LoadingPage />
      ) : (
        <>
          <section className="w-full  flex flex-col lg:flex-row justify-evenly gap-10 p-3 ">
            <div className="flex flex-col justify-center  md:flex-row gap-2 w-full max-w-3xl  ">
              <img src={product?.image[0]} alt={product?.name} className="w-full max-w-xl h-auto  object-cover rounded-xs border border-gray-200 shadow-sm" />

              <div className="flex md:flex-col gap-3 justify-center md:center">
                {product?.image.map((img: string, index: number) => (
                  <img key={index} src={img} alt={`Miniatura ${index + 1}`} className="w-20 h-30 object-cover rounded-xs border border-gray-200 cursor-pointer hover:opacity-75 transition" />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 md:px-4 w-full lg:px-8 lg:max-w-xl">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product?.name}</h1>
                <div className="flex flex-col mt-4">
                  <p className="text-gray-600 text-sm line-through">{product?.lastPrice}</p>
                  <p className="text-xl font-bold text-primary-100">{product?.price}.</p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{product?.description}</p>

              {/* Cores */}
              <AccordionFilter name="Cores">
                <div className="flex gap-3 mt-2 flex-wrap">
                  {product?.color.map((color: string) => {
                    let bgColor = color.toLowerCase();
                    if (bgColor === "beige") bgColor = "#f5f5dc";
                    return <span key={color} title={color} className="w-9 h-9 rounded-full border border-gray-300 cursor-pointer" style={{ backgroundColor: bgColor }}></span>;
                  })}
                </div>
              </AccordionFilter>

              {/* Tamanhos */}
              <AccordionFilter name="Tamanhos">
                <div className="flex gap-3 mt-2 flex-wrap">
                  {product?.sizes.map((size: string) => (
                    <span key={size} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-800 cursor-pointer hover:bg-primary-100 hover:text-white transition">
                      {size}
                    </span>
                  ))}
                </div>
              </AccordionFilter>

              {/* Botão comprar */}
              <button className="bg-primary-50 hover:bg-primary-100 text-white py-3 w-full rounded-xs font-medium text-base hover:opacity-85 cursor-pointer ">Adicionar à sacola</button>

              {/* Entrega */}
              <AccordionFilter name="Entrega">
                <div className="flex gap-1 mt-2 pl-1">
                  <input type="text" placeholder="Digite seu CEP" className="border border-gray-200 p-3 rounded-xs w-full focus:outline-none focus:ring-1 focus:ring-primary-100" />
                  <button className="bg-primary-50 text-white px-6 rounded-xs hover:bg-primary-100 transition cursor-pointer">Consultar</button>
                </div>
              </AccordionFilter>
            </div>
          </section>
          <section className="mt-10 w-full flex items-center justify-center">{recomendation && <SuggestionProduct suggestionProducts={recomendation} />}</section>
        </>
      )}

      {/* Sugestão */}
    </main>
  );
}
