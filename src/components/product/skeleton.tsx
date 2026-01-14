import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function SkeletoSliderProducts() {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col max-w-[1450px] w-full px-4 2xl:px-0 ">
        <Swiper
          modules={[Navigation, Pagination]}
          speed={1000}
           breakpoints={{
            320: {
              slidesPerView: 1.6,
              spaceBetween: 16,
              slidesPerGroup: 1,
            },
            540: {
              slidesPerView: 2,
              spaceBetween: 15,
              slidesPerGroup: 2.5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 3,
            },
          
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 20,
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
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index} className="relative flex justify-center">
              <Skeleton className="h-80 w-[220px] bg-gray-200" />
              <Skeleton className="h-50 w-[186px] bg-gray-300 absolute top-4 left-4" />
              <Skeleton className="h-3 w-[186px] bg-gray-300 absolute top-60 left-4" />
              <Skeleton className="h-3 w-[150px] bg-gray-300 absolute top-65 left-4" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
