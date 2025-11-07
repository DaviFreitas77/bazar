import { useNavigate } from "react-router-dom";
import type { Card } from "@/@types/product";
export function CardProduct({ id, name, sizes, price, image, }: Card) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/product/${id}`);
  }


  return (
    <div onClick={handleClick} className="max-w-[250px] w-full bg-white rounded-sm shadow-sm max-h-130  ">
      <div>
        <img className="w-full aspect-3/3 object-cover object-top hover:opacity-85 cursor-pointer" src={image} alt="Vestido um ombro Aura" />
      </div>

      <div className="px-2 py-4 space-y-3">
        <h3 className="text-base lg:text-base  text-gray-700 font-semibold">{name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-base font-medium text-gray-500">Tam:</span>
          {sizes.map((tamanho) => (
            <span key={tamanho} className="flex items-center justify-center w-5 h-5  rounded-full bg-gray-100 text-xs font-semibold text-gray-700 ring-1 ring-gray-300">
              {tamanho}
            </span>
          ))}
        </div>

        <p className="text-base font-semibold text-gray-700">
          {(Number(price) || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <button className="text-sm  w-full bg-primary-50 text-white py-2 px-4 rounded-xs font-semibold hover:bg-primary-100 cursor-pointer transition-colors">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
