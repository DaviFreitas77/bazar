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


      <section className="mt-20 space-y-20">
        <SuggestionProduct suggestionProducts={vestidos} tittle="Vestidos que falam por você" overline="APROVEITE" />


        <section className="mx-auto mt-20 max-w-[1445px] px-4" >
          <div className="relative min-h-[310px] overflow-hidden rounded-2xl bg-[#fffbf7] md:hidden">
            <div className="absolute left-7 top-1/2 z-10 -translate-y-1/2">
              <h2 className="font-serif text-4xl leading-[0.92] tracking-[-0.04em] text-[#4b3733]">
                Conforto <span className="block pl-5 font-normal italic text-[#bd846b]">e Estilo</span>
              </h2>
              <div className="mt-5 h-px w-7 bg-[#bd846b]" />
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#bd846b]/60 px-4 py-1.5 text-xs text-[#765b51]">
                Para cada ocasião <span aria-hidden="true">→</span>
              </span>
            </div>
            <img src="images/banner-model.png" alt="Modelo vestindo roupa elegante" className="absolute bottom-0 left-[80%] h-[90%] w-auto -translate-x-1/2 object-contain" />
          </div>
          <img
            src="images/bannerConfort.png"
            alt="Conforto e Estilo — modelos para todos os gostos, a partir de R$ 10,90"
            className="hidden aspect-[7/3] w-full rounded-2xl object-cover object-center md:block"
          />
        </section>


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
