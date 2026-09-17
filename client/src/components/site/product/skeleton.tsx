import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductCardSkeleton() {
  return (
    <div className="relative w-full max-w-[320px] rounded-sm">
      <Skeleton className="absolute left-2 top-2 z-10 h-5 w-12 rounded-full bg-gray-300" />
      <Skeleton className="aspect-[387/516] w-full rounded-t-sm bg-gray-200" />
      <div className="space-y-2 py-2 pr-2">
        <Skeleton className="h-4 w-4/5 bg-gray-200" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20 bg-gray-300" />
            <Skeleton className="h-3 w-12 bg-gray-200" />
          </div>
          <Skeleton className="h-3 w-44 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function SkeletoSliderProducts() {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col max-w-[1450px] w-full px-4 2xl:px-0 ">
        <Swiper
          modules={[Navigation, Pagination]}
          speed={1000}
          breakpoints={{
            320: { slidesPerView: 1.8, spaceBetween: 10, slidesPerGroup: 1 },
            420: { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 1 },
            530: { slidesPerView: 2.5, spaceBetween: 15, slidesPerGroup: 1 },
            800: { slidesPerView: 3.5, spaceBetween: 10, slidesPerGroup: 1 },
            1024: { slidesPerView: 4.5, spaceBetween: 10, slidesPerGroup: 1 },
            1366: { slidesPerView: 5, spaceBetween: 10, slidesPerGroup: 1 },
          }}
          navigation
          pagination={{ clickable: true }}
          className="suggestion-swiper h-100 w-full lg:h-120 2xl:h-130"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
