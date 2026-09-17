import { Stamps } from "@/components/ui/stamps";
import { SuggestionProduct } from "@/components/site/product/suggestions";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { filterProductByCategory } from "@/utils/productsUtild";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import echo from "@/lib/echo";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlidesImagesHome, SlidesImagesHomeMobile } from "@/data/carouselImagesHome";
import { useLocation } from "react-router-dom";
import { NewsLetter } from "@/components/site/footer/newsLetter";
import { useEffect } from "react";


export function Home() {
  const { data: products } = useAllProducts();
  const { pathname } = useLocation();
  const vestidos = filterProductByCategory("Vestido", products ?? []);
  const calca = filterProductByCategory("Calças", products ?? []);
  const camisetas = filterProductByCategory("Camisetas", products ?? []);

   
  return (
    <main>
      <section>
        <div className="relative w-full hidden md:block mt-28">
          <Swiper modules={[Navigation, Pagination, Autoplay]} loop speed={500} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} className="w-full home-swiper">
            {SlidesImagesHome.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                <img src={item} alt={`Slide ${index + 1}`} className="w-full  object-cover   " />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative w-full md:hidden mt-25">
          <Swiper modules={[Navigation, Pagination, Autoplay]} loop speed={500} slidesPerView={1} pagination={{ clickable: true }} autoplay={{ delay: 5000 }} className="w-full home-swiper">
            {SlidesImagesHomeMobile.map((item, index) => (
              <SwiperSlide key={index} className="relative">
                <img src={item} alt={`Slide ${index + 1}`} className="w-full  object-cover" />

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Stamps />

      <section className="mt-10">
        <div className="mx-auto mb-4 flex max-w-[1450px] flex-col items-start gap-4 px-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between md:px-8 lg:px-12 2xl:px-0">
          <h4 className="max-w-[320px] text-2xl leading-8 sm:text-3xl sm:leading-9 lg:text-4xl lg:leading-10 ">Looks novos <br />na nossa coleção</h4>
          <button className="w-full rounded-full bg-primary-50 px-4 py-2 text-sm font-light text-white cursor-pointer hover:opacity-85 sm:w-auto uppercase tracking-wider">Conferir coleção</button>
        </div>
        <SuggestionProduct suggestionProducts={vestidos} />
      </section>

      <div className="max-w-[1445px] mx-auto mt-20 px-4">
        <div className="relative bg-[#FFFBF8] w-full rounded-2xl min-h-[360px] flex items-center justify-between overflow-hidden px-5 lg:px-20">
          <div className="flex flex-col gap-6 max-w-xl  z-10 w-full md:w-50 ">
            <div className="flex items-center gap-2 flex-col lg:ml-20">
              <h1 className="text-5xl lg:text-7xl font-light text-[#6b5a55] leading-tight flex flex-col ">
                <span>Conforto</span>

                <span className="font-normal text-5xl lg:text-6xl text-center self-center">e Estilo</span>
              </h1>

              <span className="inline-block mt-4 border border-[#6b5a55]/40 text-[#6b5a55] text-sm w-40 text-center py-1 rounded-full">Para cada ocasião</span>
            </div>

            <img
              src="images/butterfly.png"
              className="absolute -left-20
            -bottom-35 opacity-20 w-120"
              alt=""
            />
          </div>

          <div className="hidden md:flex flex-1 justify-center items-end h-full relative  max-w-md">
            <img src="images/banner-model.png" alt="Modelo vestindo roupa elegante" className="h-full object-cover w-60" />

            <img src="images/butterfly.png" className="absolute top-20 right-10 w-10 opacity-80 hidden lg:block" alt="" />
            <img src="images/butterfly.png" className="absolute bottom-20 left-10 w-10 opacity-80 hidden lg:block" alt="" />
          </div>

          <div className="hidden md:flex flex-col  text-right z-10">
            <p className="text-[#6b5a55] text-2xl">
              Modelos para <br /> todos os gostos
            </p>

            <p className="mt-4 text-[#6b5a55] text-sm">A partir de</p>

            <p className="text-5xl font-semibold text-[#6b5a55]">
              R$ 10<span className="text-3xl">,90</span>
            </p>
          </div>

          <img src="images/butterfly.png" className="absolute top-10 right-20 w-10 opacity-80 hidden lg:block" alt="" />

          <img src="images/butterfly.png" className="absolute bottom-10 right-40 w-6 opacity-60 hidden lg:block" alt="" />
        </div>
      </div>

      <section className="mt-20 space-y-20">
        <SuggestionProduct suggestionProducts={vestidos} tittle="Vestidos que falam por você" overline="APROVEITE" />
        <SuggestionProduct suggestionProducts={camisetas} tittle="Garimpo de camisetas" overline="NOVIDADES" />
      </section>

      {pathname === "/" && (
        <div className="bg-[#FFFBF8] py-10  my-20">
          <NewsLetter />
        </div>
      )}

    </main>
  );
}
