interface CardProductProps {
  nameProduct: string;
  tamanhos: string[];
  currentPrice: string;
  originalPrice?: string;
  imageUrl: string;
}
export function CardProduct({
  nameProduct,
  tamanhos,
  currentPrice,
  originalPrice,
  imageUrl,
}: CardProductProps) {
  return (
    <div className="max-w-xs w-full bg-white rounded-sm shadow-sm max-h-130">
      <div>
        <img
          className="w-full aspect-[3/3] object-cover object-top"
          src="/images/moletom.jpg"
          alt="Vestido um ombro Aura"
        />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">{nameProduct}</h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Tamanhos:</span>
          {tamanhos.map((tamanho) => (
            <span
              key={tamanho}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-semibold text-gray-700 ring-1 ring-gray-300"
            >
              {tamanho}
            </span>
          ))}
        </div>

        <p className="text-xl font-bold text-gray-900">{currentPrice}</p>

        <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-sm font-semibold hover:bg-gray-800 transition-colors">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
