import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardProduct } from "../../ui/cardProduct";
import type { Product } from "@/@types/product";

import { SkeletoSliderProducts } from "./skeleton";

interface SuggestionProductProps {
  suggestionProducts: Product[];
  tittle?: string;

}

export function SuggestionProduct({ suggestionProducts, tittle }: SuggestionProductProps) {
  const limitedProduct = suggestionProducts.slice(0, 8);

  while (limitedProduct.length == 0) {
    return <SkeletoSliderProducts />;
  }

  return (
    <section className="w-full px-4 md:px-8">
      <div className="mx-auto max-w-[1450px] w-full">
        <div className="flex w-full justify-between">
          <h2 className="text-lg 2xl:text-2xl font-semibold mb-3 text-gray-800">{tittle}</h2>
          
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          speed={500}
          breakpoints={{
            320: { slidesPerView: 1.8, spaceBetween: 10, slidesPerGroup: 1 },
            420: { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 1 },
            530: { slidesPerView: 2.5, spaceBetween: 15, slidesPerGroup: 1 },
            800: { slidesPerView: 3.5, spaceBetween: 10, slidesPerGroup: 1 },
            1024: { slidesPerView: 4.5, spaceBetween: 10, slidesPerGroup: 1 },
            1366: { slidesPerView: 5.5, spaceBetween: 10, slidesPerGroup: 1 },
            1536: { slidesPerView: 5.5, spaceBetween: 25, slidesPerGroup: 1 },
          }}
          navigation
          className="w-full"
        >
          {limitedProduct.length > 0 &&
            limitedProduct.map((item) => (
              <SwiperSlide key={item.id}>
                <CardProduct price={item.price} image={item.image[0]} name={item.name} id={item.id} sizes={item.sizes} lastPrice={item.lastPrice} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
}
