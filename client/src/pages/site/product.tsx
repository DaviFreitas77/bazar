import { useLocation, useParams } from "react-router-dom";
import { AccordionFilter } from "@/components/ui/accordion";
import { SuggestionProduct } from "@/components/site/product/suggestions";
import { useProductById } from "@/hooks/site/useProductById";
import { useProductsByCategory } from "@/hooks/site/useProductsByCategory";
import type { Product } from "@/@types/product";
import { LoadingPage } from "@/components/site/loading/loadingPage";
import { useEffect, useMemo, useState } from "react";
import { FaCircle, FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { apiAddProduct } from "@/api/site/shoppingCart.api";
import { toast } from "sonner";
// import { GoHeart } from "react-icons/go";
import { BreadcrumbPages } from "@/components/ui/breadcrumb";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { Stamps } from "@/components/ui/stamps";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useCheckout } from "@/context/checkoutContext";
import { useUI } from "@/context/UIContext";
import { CalculateFrete, type CalculateFreteProps } from "@/api/site/delivery.api";
import { Loading } from "@/components/site/loading/loading";
import { useMyLogradouro } from "@/hooks/site/useMyLogradouro";



interface FreteService {
  id: number;
  company: {
    id: number
    name: string;
    picture: string
  };
  name:string;
  delivery_range: {
    max: number;
    min: number
  }
  price: number;
  // add other fields you expect from the API here
}
export function Product() {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorName, setSelectedColorName] = useState<string>("");
  const [selectedSizeName, setSelectedSizeName] = useState<string>("");
  const [numberImage, setNumberImage] = useState<number>(0);
  const [postalCode, setPostalCode] = useState<string>('')
  const { setStep, setPreference, setDiscount } = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFrete, setLodingFrete] = useState<boolean>(false)
  const [servicesFrete, setServicesFrete] = useState<FreteService[]>([]);
  const [messageError, setMessageError] = useState<string>('')
  const { data: myLogradouro } = useMyLogradouro()
  const { dispatch } = useCart();
  const { name } = useUser();
  const { pathname } = useLocation();
  const { setModalAuth } = useUI();
  const { id } = useParams();
  const numberId = Number(id);
  const { data: product, isLoading: isLoadingProduct } = useProductById(numberId);


  const images = product?.image ?? [];
  const colors = product?.color ?? [];
  const sizes = product?.sizes ?? [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { data: recomendation } = useProductsByCategory(product?.categoryName ?? null);

  const chooseImage = useMemo(() => {
    return images[numberImage]?.image ?? "";
  }, [product, numberImage]);

  const imageProduct = product?.image?.[0]?.image ?? "";

  const handleAddCart = async () => {
    if (!name) {
      setModalAuth(true);
      return;
    }

    if (!selectedColor || !selectedSize) {
      return alert("selecione cor e tamanho");
    }

    setLoading(true);
    setDiscount(0);
    setStep(1);
    setPreference({
      id: "",
      total: 0,
      orderId: "",
      created_at: "",
    });

    try {
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setSelectedColor(null);
    setSelectedSize(null);
    toast.success("Produto adicionado ao carrinho!");
  };


  const openWhatsap = () => {
    const phoneNumber = "5511976145291";

    const message = `Olá! Tenho interesse no produto:

      Produto: ${product?.name}
      Preço: ${Number(product?.price).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}
      Imagem: ${imageProduct}

  Poderia me ajudar?`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };


  const calcFrete = async (zipCode?: string) => {
    setMessageError("")
    setLodingFrete(true)
    try {
      const data: CalculateFreteProps = {
        to: {
          postal_code: zipCode ?? postalCode
        },
        products: [
          {
            id: product!.id.toString(),
            width: 1, // largura
            height: 1,  // alutra
            length: 1,  //comprimento
            weight: 1, //peso
            quantity: 1,
            insurance_value: Number(product!.price)

          }
        ]
      }
      const response = await CalculateFrete(data)
      console.log(response)
      setServicesFrete(response)
    } catch (error: any) {
      if (error.response.status == 422) {
        setMessageError(error.response.data.message)
      }
      console.log(error)
    } finally {
      setLodingFrete(false)
    }

  }
  return (
    <main className="flex flex-col items-center justify-center md:py-10 min-h-screen mt-25">
      {isLoadingProduct ? (
        <LoadingPage />
      ) : (
        <section className="flex flex-wrap w-full max-w-[1700px]">
          <div className="flex flex-wrap lg:flex-nowrap w-full justify-evenly ">
            <div className="flex flex-col justify-center  md:flex-row gap-2 w-full max-w-2xl 2xl:max-w-3xl ">
              {images && (
                <>
                  <div className="hidden md:flex md:flex-col xl:gap-2">
                    {images.map((img, index) => (
                      <img onClick={() => setNumberImage(index)} key={img.id} src={img.image} alt={`Miniatura ${img.id + 1}`} className={`w-35 h-50 object-cover rounded-xs border border-gray-200 cursor-pointer hover:opacity-75 transition ${numberImage !== index ? "opacity-25" : ""}`} />
                    ))}
                  </div>

                  {/* Imagem desktop */}
                  <div className="w-full md:flex hidden">{chooseImage && <img src={chooseImage} className="w-full  h-auto object-cover  " alt={product?.name ?? "Produto"} />}</div>

                  {/* imagem mobile/tablet */}
                  <div className="md:hidden w-full max-w-xl">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      loop={true}
                      speed={500}
                      breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10, slidesPerGroup: 1 },
                      }}
                      navigation
                      pagination={{ clickable: true }}
                      className="w-full product-swiper"
                    >
                      {images &&
                        images.map((image) => (
                          <SwiperSlide key={image.id}>
                            <img src={image.image} alt="" className="w-full " />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 md:px-4 w-full px-3 lg:max-w-xl mt-5 lg:mt-0">
              <BreadcrumbPages pageName={["Produto", `${product?.name}`]} />
              <div>
                <div className="flex  items-center justify-between">
                  <h1 className="text-3xl font-semibold text-gray-700 mb-2  capitalize">{product?.name}</h1>
                  {/* <button className="cursor-pointer text-primary-50 hover:text-red-500">
                    <GoHeart size={30} />
                  </button> */}
                </div>
                <div className="flex flex-col mt-4">
                  {product?.lastPrice && Number(product.lastPrice) > 0 && (
                    <p className="text-gray-600 text-base line-through">
                      {Number(product?.lastPrice).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary-50">
                    {Number(product?.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
              {/* Cores */}
              <AccordionFilter name="Cores" value="item-1">
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
              <AccordionFilter name="Tamanhos" value="item-1">
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
              <button
                onClick={handleAddCart}
                className={`flex items-center justify-center gap-2 text-white font-medium transition duration-200 shadow-sm cursor-pointer  px-10 py-3 rounded-md ${loading ? "bg-primary-100 cursor-not-allowed" : "bg-primary-50 hover:opacity-85"}`}
                disabled={loading}
              >
                <LiaShoppingBagSolid size={22} />
                {loading ? "Carregando..." : "Adicionar à sacola"}
              </button>
              <button
                onClick={openWhatsap}
                className="flex items-center justify-center gap-2 text-gray-700 cursor-pointer text-sm ">
                <FaWhatsapp size={22} />
                Comprar pelo whatsApp
              </button>

              <AccordionFilter name="Descrição" value="item-2">
                <p>{product?.description}</p>
              </AccordionFilter>

              {/* Entrega */}
              <AccordionFilter name="Consultar frete" value="item-2">
                <div className="flex flex-col gap-4 mt-2 pl-1">


                  {servicesFrete?.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {servicesFrete.map((frete) => (
                        <div key={frete.id} className="flex items-center justify-between gap-4 w-full p-2 border-b border-gray-100">
                          <div className="flex items-center gap-4">
                            <img src={frete.company.picture} alt={frete.company.name} className="w-16 h-auto object-contain" />
                            <div>
                              <p className="font-semibold text-sm">{frete.name}</p>
                              <p className="text-xs text-gray-500">Chega em até {frete.delivery_range.max} dias</p>
                            </div>
                          </div>
                          <p className="font-bold text-primary-50">R$ {frete.price}</p>
                        </div>
                      ))}
                    </div>
                  )}


                  {myLogradouro && myLogradouro.length > 0 ? (
                    <div className="w-full space-y-2">
                      <p className="text-xs font-medium text-gray-400">Selecione um endereço salvo:</p>
                      {myLogradouro.map((adress) => (
                        <div
                          key={adress.id}
                          onClick={() => calcFrete(adress.zip_code)}
                          className="border border-dashed p-3 border-gray-200 w-full cursor-pointer hover:border-primary-50 hover:bg-blue-50/20 transition-all duration-300 rounded-md"
                        >
                          <p className="font-bold text-base">{adress.zip_code}</p>
                          <p className="font-light text-sm text-gray-600">
                            {adress.type} - {adress.number}, {adress.district} - {adress.state}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Digite seu CEP"
                        className="border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-50 transition-all duration-300 flex-1"
                      />
                      <button
                        onClick={() => calcFrete()}
                        disabled={loadingFrete}
                        className="bg-primary-50 text-white px-4 rounded-md hover:opacity-85 transition cursor-pointer disabled:opacity-50"
                      >
                        {loadingFrete ? <Loading /> : "Consultar"}
                      </button>
                    </div>
                  )}
                </div>

                {messageError && (
                  <p className="px-2 text-red-500 text-sm mt-2 italic">{messageError}</p>
                )}
              </AccordionFilter>
            </div>
          </div>

          <div className="w-full">
            <Stamps />
          </div>
          <section className="mt-10 w-full flex items-center justify-center">{recomendation && <SuggestionProduct tittle="Talvez você possa gostar" suggestionProducts={recomendation} />}</section>
        </section>
      )}
    </main>
  );
}
