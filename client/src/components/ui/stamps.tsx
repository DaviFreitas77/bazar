import { CiCreditCard2, CiDeliveryTruck } from "react-icons/ci";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PiPixLogoLight } from "react-icons/pi";
import { HiOutlineCheckBadge } from "react-icons/hi2";

export function Stamps() {
  return (
    <section className="flex justify-center items-center px-4 ">
      <div className="justify-between max-w-[1100px] 2xl:max-w-[1300px] py-15 w-full hidden lg:flex">
        <div className="flex items-center gap-2">
          <PiPixLogoLight size={50}  className="text-primary-50" />
          <div className="leading-5">
            <p className="text-gray-800 font-bold text-sm">PIX</p>
            <p className="mt-1 text-xs">Compre rápido</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CiCreditCard2 size={50}  className="text-primary-50" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold text-sm">PARCELAMENTO</p>
            <p className="mt-1 text-xs">em até 12x</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineCheckBadge size={50}  className="text-primary-50" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold text-sm">SITE SEGURO</p>
            <p className="mt-1 text-xs">compre tranquilo</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CiDeliveryTruck size={50}  className="text-primary-50" />
          <div className="leading-5">
            <p className="text-gray-800 font-semibold text-sm">RETIRE</p>
            <p className="mt-1 text-xs">gratís no bazar</p>
          </div>
        </div>
      </div>

      {/* responsivo */}
      <div className="flex w-full lg:hidden py-10 px-1 md:px-20">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
         slidesPerView={2}
          spaceBetween={20}
          className="linear-swiper"
        >
          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <PiPixLogoLight size={40} className="text-primary-50" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">PIX</p>
                <p className="mt-1 text-xs">Compre rápido</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <CiCreditCard2 size={40}  className="text-primary-50" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">CARTÃO</p>
                <p className="mt-1 text-xs">em até 12x</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2 justify-center">
              <HiOutlineCheckBadge size={40}  className="text-primary-50" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">SITE SEGURO</p>
                <p className="mt-1 text-xs">compre tranquilo</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex items-center gap-2  justify-center">
              <CiDeliveryTruck size={40}  className="text-primary-50" />
              <div className="leading-5">
                <p className="text-gray-800 font-semibold text-sm">RETIRE</p>
                <p className="mt-1 text-xs">gratís no bazar</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
