import { useNavigate } from "react-router-dom";

interface CardProductProps {
  idProduct: number;
  nameProduct: string;
  tamanhos: string[];
  currentPrice: string;
  originalPrice?: string;
  imageUrl: string;
}
export function CardProduct({
  idProduct,
  nameProduct,
  tamanhos,
  currentPrice,
  originalPrice,
  imageUrl,
}: ProductProps.Card) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/product/${idProduct}`);
  }

  return (
    <div
      onClick={handleClick}
      className="max-w-[250px] w-full bg-white rounded-sm shadow-sm max-h-130  "
    >
      <div>
        <img
          className="w-full aspect-[3/3] object-cover object-top hover:opacity-85 cursor-pointer"
          src={imageUrl}
          alt="Vestido um ombro Aura"
        />
      </div>

      <div className="px-2 py-4 space-y-3">
        <h3 className="text-sm lg:text-base  text-gray-900">
          {nameProduct}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm lg:text-base font-medium text-gray-500">
            Tam:
          </span>
          {tamanhos.map((tamanho) => (
            <span
              key={tamanho}
              className="flex items-center justify-center w-5 h-5  rounded-full bg-gray-100 text-xs font-semibold text-gray-700 ring-1 ring-gray-300"
            >
              {tamanho}
            </span>
          ))}
        </div>

        <p className="text-base  font-bold text-gray-900">
          {currentPrice}
        </p>

        <button className="text-sm  w-full bg-primary-50 text-white py-2 px-4 rounded-xs font-semibold hover:bg-primary-100 cursor-pointer transition-colors">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
