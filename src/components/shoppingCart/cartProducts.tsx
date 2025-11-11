import { Plus, Minus } from "lucide-react";
import { TotalShoppingCart } from "./totalShoppingCart";
import { useCart } from "@/context/cartContext";

export function CartProducts() {
  const { state } = useCart();

  return (
    <section className="mt-2 flex flex-col gap-2">
      {state.length > 0 ? (
        state.map((item) => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 border-b pb-3 border-gray-200">
            <img src={item.image} alt={item.name} className="w-20 object-cover" />
            <div className="w-full">
              <p className="font-semibold text-gray-700">{item.name}</p>
              <p className="text-xs text-gray-400">Quantidade: {item.quantity}</p>
              <p className="text-xs text-gray-400">Cor: {item.colorName}</p>
              <p className="text-xs text-gray-400">Tamanho: {item.sizeName}</p>

              <div className="flex items-end justify-between">
                <p className="font-semibold text-gray-900 mt-10">{Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>

                <div className="flex items-center gap-3 mt-1">
                  <button className="p-1 rounded-full border border-primary-50 hover:bg-primary-100 hover:text-white cursor-pointer">
                    <Minus size={16} />
                  </button>

                  <p className="text-sm font-medium text-gray-700">{item.quantity}</p>

                  <button className="p-1 border rounded-full border-primary-50 hover:bg-primary-100 hover:text-white cursor-pointer">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>O carrinho está vazio</p>
      )}

      <TotalShoppingCart />
    </section>
  );
}
