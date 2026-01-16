import { LiaShoppingBagSolid } from "react-icons/lia";
import { FiTrash2 } from "react-icons/fi";
import { SkeletonSummary } from "@/components/site/skeleton/summary";
import type { CartItem } from "@/context/cartContext";
import { MdDone } from "react-icons/md";
import { useCheckout } from "@/context/checkoutContext";
import { ApplyCupom } from "../applyCupom";

interface SummaryProps {
  products: CartItem[];
  total: string;
  isConfirmed?: boolean;
  numberOrder: string;
}
export function Summary({ products, isConfirmed, numberOrder, total }: SummaryProps) {
  const { step } = useCheckout();
  return (
    <section className="border border-gray-200 bg-white md:shadow-sm rounded-md p-6  md:p-6 h-fit  lg:max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#F4EDE7] p-3 rounded-full text-primary-50 shadow-sm">
          <LiaShoppingBagSolid size={22} />
        </div>
        <div>
          <h2 className="text-lg text-gray-900 font-semibold">Resumo do pedido</h2>
          <p className="text-sm text-gray-500">Revise seus produtos antes de pagar.</p>
        </div>
      </div>

      {/* Produto */}

      <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="flex items-center justify-between border border-gray-200 rounded-md p-4">
              {/* Produto */}
              <div className="flex gap-3">
                <div className="w-18 h-18 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  <img src={product.image} alt="Produto" className="object-cover w-full h-full aspect-3/3" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.colorName}</p>
                  <p className="text-xs text-gray-500">{product.sizeName}</p>
                  <p className="text-xs text-gray-500">Qtd: {product.quantity}</p>
                </div>
              </div>

              {/* Preço + Lixeira */}
              <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-800">{Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                <button className="text-gray-400 hover:text-red-500 transition duration-200" title="Remover do carrinho">
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <SkeletonSummary />
        )}

        {step === 4 ? null : <ApplyCupom step={step} />}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-gray-600">Frete</p>
          <p className="text-gray-800 font-medium">R$ 15,00</p>
        </div>

        {total && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-gray-900 font-semibold text-lg">Total</p>
            <p className="text-primary-50 font-bold text-lg"> {total}</p>
          </div>
        )}

        {isConfirmed && (
          <div className="bg-green-50 p-6 rounded-2xl border border-green-200 max-w-md mx-auto my-10 flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <div className="bg-green-800 p-2 rounded-full text-white">
                <MdDone size={20} />
              </div>
              <p className="text-green-800 font-semibold text-base">Pedido processado com sucesso!</p>
            </div>
            <div>
              <p className="text-green-800 font-semibold">Número do pedido: #{numberOrder}</p>
              <p className="text-green-700 text-sm mt-1">Guarde este número para acompanhar seu pedido</p>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-gray-900 font-semibold">Segurança da Compra</h4>
          <p className="mt-2 text-gray-500">Sua compra é 100% segura. Utilizamos protocolos de criptografia e parceiros de pagamento confiáveis para garantir a proteção dos seus dados e transações.</p>
        </div>
      </div>
    </section>
  );
}
