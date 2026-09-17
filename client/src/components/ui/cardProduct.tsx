import { useNavigate } from "react-router-dom";
import type { Product } from "@/@types/product";
import { useUI } from "@/context/UIContext";


export interface Size {
  nameSize: string;
  idSize: number;
}

export interface Color {
  nameColor: string;
  idColor: number;
  hexadecimal: string
}

export function CardProduct({ id, image, lastPrice, name, price }: Product) {
  const navigate = useNavigate();
  const { setOpenSearch } = useUI();
  function handleClick() {
    navigate(`/product/${id}`);
    if (setOpenSearch) {
      setOpenSearch(false);
    }
  }


  function calcDiscount(lastPrice: number, price: number): number {
    if(lastPrice && lastPrice > 0){
      const discount = ((lastPrice - price) / lastPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  }


  return (
    <div className="relative max-w-[320px] w-full rounded-sm ">
      <div className={`${calcDiscount(lastPrice, price) > 0 ? 'bg-primary-50' :'hidden'} absolute top-2 left-2 z-10 bg-primary-50 text-white text-xs px-2 py-1 rounded-full uppercase`}>
        {
          calcDiscount(lastPrice, price) > 0 ? `${calcDiscount(lastPrice, price)}% off` : null
        }
   
      </div>
      <div onClick={handleClick} >
        <img className="w-full object-cover object-center hover:opacity-85 cursor-pointer rounded-t-sm" src="/images/model.jpeg" alt="Vestido um ombro Aura" />
      </div>

      <div className="pr-2 py-2 space-y-1">
        <h3 className="text-sm lg:text-base  text-gray-800 capitalize">{name}</h3>



        <div className="">
          <div className="flex  items-center gap-2 ">
            <p className="text-base font-semibold text-primary-50">
              {Number(price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            {lastPrice && lastPrice > 0 && (
              <p className="text-gray-600 text-xs line-through">
                {Number(lastPrice).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-600">ou 3 vezes de R$55,00 sem juros</p>
        </div>

      </div>
    </div>
  );
}
