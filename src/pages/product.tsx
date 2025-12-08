import { useLocation, useParams } from "react-router-dom";
import { AccordionFilter } from "@/components/ui/accordion";
import { SuggestionProduct } from "@/components/product/suggestions";
import { useProductById } from "@/hooks/useProductById";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";
import type { Product } from "@/@types/product";
import { LoadingPage } from "@/components/loading/loadingPage";
import { useEffect, useMemo, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { apiAddProduct } from "@/api/shoppingCart.api";
export function Product() {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string>("");
  const [selectedSizeName, setSelectedSizeName] = useState<string>("");
  const [numberImage, setNumberImage] = useState<number>(0);
  const { dispatch } = useCart();
  const { name } = useUser();
  const { pathname } = useLocation();
  const { id } = useParams();
  const numberId = Number(id);
  const { data: product, isLoading: isLoadingProduct } = useProductById(numberId);

  const images = product?.image ?? [];
  const colors = product?.color ?? [];
  const sizes = product?.sizes ?? [];

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  const { data: recomendation } = useProductsByCategory(product?.category ?? null);

  const chooseImage = useMemo(() => {
    return images[numberImage]?.image ?? "";
  }, [product, numberImage]);

  const imageProduct = product?.image?.[0]?.image ?? "";


  const handleAddCart = async () => {
    if (!selectedColor || !selectedSize) {
      return alert("selecione cor e tamanho");
    }
    dispatch({
      type: "addItem",
      payload: {
        id: product!.id,
        name: product!.name,
        price: Number(product?.price),
        image: imageProduct,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
        colorName: selectedColorName,
        sizeName: selectedSizeName,
      },
    });

    if (name) {
      await apiAddProduct({
        id: product!.id,
        name: product!.name,
        price: Number(product?.price),
        image: imageProduct,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      });
    }
    setSelectedColor(null);
    setSelectedSize(null);
  };

  return (
    <main className="flex flex-col items-center justify-center py-10 min-h-screen ">
      {isLoadingProduct ? (
        <LoadingPage />
      ) : (
        <>
          <section className="w-full  flex flex-col lg:flex-row justify-evenly gap-10 p-3 max-w-[1700px] px-4 md:px-8">
            <div className="flex flex-col justify-center  md:flex-row gap-2 w-full max-w-3xl  ">
              {images.length > 2 ? (
                <div className="grid grid-cols-2 gap-1">
                  {images.map((img) => (
                    <img key={img.id} src={img.image} alt={img.image} className="w-full max-w-xl h-auto  object-cover rounded-xs border border-gray-200 shadow-sm" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="w-full flex  max-w-2xl">{chooseImage && <img src={chooseImage} className="w-full max-w-2xl h-auto object-cover rounded-xs border border-gray-200 shadow-sm" alt={product?.name ?? "Produto"} />}</div>
                  <div className="flex md:flex-col gap-3 justify-center md:center">
                    {images.map((img, index) => (
                      <img onClick={() => setNumberImage(index)} key={img.id} src={img.image} alt={`Miniatura ${img.id + 1}`} className={`w-20 h-30 object-cover rounded-xs border border-gray-200 cursor-pointer hover:opacity-75 transition ${numberImage === index ? "opacity-25" : ""}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 md:px-4 w-full lg:px-8 lg:max-w-xl">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product?.name}</h1>
                <p className="text-gray-700 leading-relaxed">{product?.description}</p>
                <div className="flex flex-col mt-4">
                  {product?.lastPrice && (
                    <p className="text-gray-600 text-sm line-through">
                      {Number(product?.lastPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}

                  <p className="text-xl font-bold text-primary-100">
                    {Number(product?.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              {/* Cores */}
              <AccordionFilter name="Cores">
                <div className="flex gap-3 mt-2 flex-wrap ">
                  {colors.map((color: any) => (
                    <button
                      onClick={() => {
                        setSelectedColor(color.id);
                        setSelectedColorName(color.name);
                      }}
                      key={color.id}
                      className={`border p-0.5 rounded-full border-gray-200 hover:border-primary-100 cursor-pointer ${selectedColor === color.id ? "border-primary-100 opacity-50" : ""}`}
                    >
                      <FaCircle size={30} color={color.name} />
                    </button>
                  ))}
                </div>
              </AccordionFilter>

              {/* Tamanhos */}
              <AccordionFilter name="Tamanhos">
                <div className="flex gap-3 mt-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      onClick={() => {
                        setSelectedSize(size.id);
                        setSelectedSizeName(size.name);
                      }}
                      key={size.id}
                      className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-800 cursor-pointer hover:bg-primary-100 hover:text-white transition ${selectedSize === size.id ? "bg-primary-100 text-white" : ""}`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </AccordionFilter>

              <button onClick={handleAddCart} className="bg-primary-50 hover:bg-primary-100 text-white py-3 w-full rounded-xs font-medium text-base hover:opacity-85 cursor-pointer ">
                Adicionar à sacola
              </button>

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
