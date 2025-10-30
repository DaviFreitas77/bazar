import { useParams } from "react-router-dom";
import { getProductById } from "@/utils/productsUtild";
import { AccordionFilter } from "@/components/ui/accordion";

export function Product() {
  const { id } = useParams();
  const numberId = Number(id);
  const product = getProductById(numberId);

  if (!product || product.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen text-gray-700">
        <p>Produto não encontrado 😢</p>
      </main>
    );
  }

  const prod = product[0];
  const imagesProduct = prod.image;

  return (
    <main className="flex items-center justify-center bg-gray-50 py-10 min-h-screen">
      <section className="w-full  flex flex-col lg:flex-row justify-center  gap-10  p-3 ">
        <div className="flex flex-col justify-center items-center 2xl:flex-row gap-2 w-full lg:w-1/2">
          
          <img
            src={imagesProduct[0]}
            alt={prod.productName}
            className="w-full max-w-2xl h-auto  object-cover rounded-xs border border-gray-200 shadow-sm"
          />

          
          <div className="flex 2xl:flex-col gap-3 justify-center md:center">
            {imagesProduct.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Miniatura ${index + 1}`}
                className="w-20 h-30 lg:w-30 lg:h-40 object-cover rounded-xs border border-gray-200 cursor-pointer hover:opacity-75 transition"
              />
            ))}
          </div>
        </div>

        
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              {prod.productName}
            </h1>
            <div className="flex items-center gap-2">
                
                <p className="text-xl font-bold text-[#9E5330]">
                  {prod.currentPrice}
                </p>
                <p className="text-gray-600 text-sm line-through">
                  {prod.originalPrice}
                </p>
            </div>
            <p className="text-sm text-green-600 font-medium">
              {prod.discount}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">{prod.description}</p>

          {/* Cores */}
          <AccordionFilter name="Cores">
            <div className="flex gap-3 mt-2 flex-wrap">
              {prod.color.map((color) => {
                let bgColor = color.toLowerCase();
                if (bgColor === "beige") bgColor = "#f5f5dc";
                return (
                  <span
                    key={color}
                    title={color}
                    className="w-9 h-9 rounded-full border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: bgColor }}
                  ></span>
                );
              })}
            </div>
          </AccordionFilter>

          {/* Tamanhos */}
          <AccordionFilter name="Tamanhos">
            <div className="flex gap-3 mt-2 flex-wrap">
              {prod.sizes.map((size) => (
                <span
                  key={size}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-800 cursor-pointer hover:bg-[#9E5330] hover:text-white transition"
                >
                  {size}
                </span>
              ))}
            </div>
          </AccordionFilter>

          {/* Botão comprar */}
          <button className="bg-[#9E5330] text-white py-3 w-full rounded-xs font-medium text-lg hover:bg-[#864326] transition">
            Adicionar à sacola
          </button>

          {/* Entrega */}
          <AccordionFilter name="Entrega">
            <div className="flex gap-1 mt-2 pl-1">
              <input
                type="text"
                placeholder="Digite seu CEP"
                className="border border-gray-200 p-3 rounded-xs w-full focus:outline-none focus:ring-1 focus:ring-[#9E5330]"
              />
              <button className="bg-[#9E5330] text-white px-6 rounded-xs hover:bg-[#864326] transition">
                Consultar
              </button>
            </div>
          </AccordionFilter>
        </div>
      </section>
    </main>
  );
}
