import { Plus, Minus } from "lucide-react";
import { TotalShoppingCart } from "./totalShoppingCart";

export function CartProducts() {
  return (
    <section className="mt-2 flex flex-col gap-2 ">
      <div className="flex gap-3 border-b pb-3 border-gray-200">
        <img
          src="/images/moletom.jpg"
          alt="produto"
          className="w-20  object-cover"
        />
        <div className="w-full">
          <p className="font-semibold text-gray-700">Vestido Floral midi 1</p>
          <p className="text-xs text-gray-400">Quantidade: 1</p>
          <div className="flex items-end justify-between ">
            <p className="font-semibold text-gray-900 mt-10">R$ 129,90</p>
            <div className="flex items-center gap-3 mt-1">
              <button className="p-1 rounded-full border border-primary-50 hover:bg-primary-50 cursor-pointer">
                <Minus size={16} />
              </button>

              <p className="text-sm font-medium text-gray-700">1</p>

              <button className="p-1  border rounded-full border-primary-50 hover:bg-primary-50 cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 border-b py-2 border-gray-200">
        <img
          src="/images/moletom.jpg"
          alt="produto"
          className="w-20  object-cover"
        />
        <div className="w-full">
          <p className="font-semibold text-gray-700">Vestido Floral midi 1</p>
          <p className="text-xs text-gray-400">Quantidade: 1</p>
          <div className="flex items-end justify-between ">
            <p className="font-semibold text-gray-900 mt-10">R$ 129,90</p>
            <div className="flex items-center gap-3 mt-1">
              <button className="p-1 rounded-full border border-primary-50 hover:bg-primary-50 cursor-pointer">
                <Minus size={16} />
              </button>

              <p className="text-sm font-medium text-gray-700">1</p>

              <button className="p-1  border rounded-full border-primary-50 hover:bg-primary-50 cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <TotalShoppingCart />
    </section>
  );
}
