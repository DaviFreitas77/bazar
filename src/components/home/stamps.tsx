import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function Stamps() {
  return (
    <section className="flex justify-center items-center px-4 ">
      <div className="justify-between max-w-[1100px] 2xl:max-w-[1300px] py-15 w-full hidden lg:flex">
        <div className="flex items-center gap-2">
          <img src="images/iconPix.png" alt="" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold">PIX</p>
            <p className="text-gray-400 mt-1">Compre rápido</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="images/iconCard.png" alt="" className="w-15" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold">PARCELAMENTO</p>
            <p className="text-gray-400 mt-1">em até 12x</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src="images/iconSuporte.png" alt="" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold">SUPORTE</p>
            <p className="text-gray-400 mt-1">24 horas</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src="images/iconPix.png" alt="" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold">SITE SEGURO</p>
            <p className="text-gray-400 mt-1">compre tranquilo</p>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:hidden py-10 px-1 md:px-20">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false} 
          slidesPerView={4} 
          spaceBetween={20} 
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 5 },
            510: { slidesPerView: 3, spaceBetween: 15 },
            800: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4.5, spaceBetween: 10 },
          }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <img src="images/iconPix.png" alt="" className="w-7"/>
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">PIX</p>
                <p className="text-gray-400 mt-1 text-xs">Compre rápido</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <img src="images/iconCard.png" alt="" className="w-7" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">CARTÃO</p>
                <p className="text-gray-400 mt-1 text-xs">em até 12x</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <img src="images/iconSuporte.png" alt="" className="w-7" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">SUPORTE</p>
                <p className="text-gray-400 mt-1 text-xs">24 horas</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <img src="images/iconPix.png" alt="" className="w-7"/>
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">SITE SEGURO</p>
                <p className="text-gray-400 mt-1 text-xs">compre tranquilo</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
