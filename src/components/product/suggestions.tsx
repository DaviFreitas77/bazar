import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardProduct } from "../ui/card";
import type {Product } from "@/@types/product";

interface SuggestionProductProps {
  suggestionProducts: Product[];
}

export function SuggestionProduct({ suggestionProducts }: SuggestionProductProps) {

    return (
    <section className="w-full px-4 md:px-8">
      <div className="mx-auto max-w-[1450px] w-full">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">Recomendamos para você</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          speed={1000}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 10,
              slidesPerGroup: 2,
            },
            540: {
              slidesPerView: 2.5,
              spaceBetween: 15,
              slidesPerGroup: 2.5,
            },
            800:{
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 10,
              slidesPerGroup: 4,
            },
            1366: {
              slidesPerView: 5,
              spaceBetween: 10,
              slidesPerGroup: 5,
            },
            1536: {
              slidesPerView: 5.5,
              spaceBetween: 25,
              slidesPerGroup: 5,
            },
          }}
          navigation
          pagination={{ clickable: true }}
          className="w-full"
        >
          {suggestionProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <CardProduct  price={item.price} image={item.image[0]} name={item.name} id={item.id} sizes={item.sizes} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
