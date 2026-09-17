import { CiCreditCard2, CiDeliveryTruck } from "react-icons/ci";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { PiPixLogoLight } from "react-icons/pi";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const benefits = [
  { Icon: PiPixLogoLight, title: "Pague com Pix", description: "Rápido, prático e seguro" },
  { Icon: CiCreditCard2, title: "Parcele sua compra", description: "Em até 12x no cartão" },
  { Icon: HiOutlineCheckBadge, title: "Site seguro", description: "Compre com tranquilidade" },
  { Icon: CiDeliveryTruck, title: "Retire na loja", description: "Grátis no Bazar" },
];

function Benefit({ Icon, title, description }: (typeof benefits)[number]) {
  return (
    <div className="group flex min-h-24 items-center gap-3 rounded-2xl px-4 py-3  transition duration-300 hover:-translate-y-0.5 hover:border-[#a2785a]/30 ">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f8f1ec] text-primary-50 transition duration-300 group-hover:bg-primary-50 group-hover:text-white">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-sm font-semibold tracking-[0.01em] text-stone-800">{title}</p>
        <p className="mt-1 text-xs leading-4 text-stone-500">{description}</p>
      </div>
    </div>
  );
}

export function Stamps() {
  return (
    <section aria-label="Vantagens de comprar no Bazar" className="px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto hidden max-w-[1100px] grid-cols-4 gap-3 lg:grid xl:max-w-[1300px] xl:gap-4">
        {benefits.map((benefit) => <Benefit key={benefit.title} {...benefit} />)}
      </div>

      <div className="mx-auto max-w-xl lg:hidden">
        <Swiper
          modules={[Autoplay]}
          loop
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          allowTouchMove={false}
          breakpoints={{
            0: { slidesPerView:1.20, spaceBetween: 12 },
            480: { slidesPerView: 1.65, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
          }}
          className="benefits-swiper !px-1 !py-2"
        >
          {benefits.map((benefit) => (
            <SwiperSlide key={benefit.title} className="h-auto">
              <Benefit {...benefit} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
