import { LiaShoppingBagSolid } from "react-icons/lia";
import { FiTrash2 } from "react-icons/fi";
export function Summary(){
    return(
         <section className="border border-gray-200 bg-white md:shadow-sm rounded-md p-2 pt-4 md:p-6 h-fit  max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#F4EDE7] p-3 rounded-full text-primary-50 shadow-sm">
              <LiaShoppingBagSolid size={22} />
            </div>
            <div>
              <h2 className="text-lg text-gray-900 font-semibold">
                Resumo do pedido
              </h2>
              <p className="text-sm text-gray-500">
                Revise seus produtos antes de pagar.
              </p>
            </div>
          </div>

          {/* Produto */}

          <div className="space-y-6 border-t border-gray-100 pt-4 text-sm">
            <div className="flex items-center justify-between border border-gray-200 rounded-md p-4">
              {/* Produto */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Produto"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Camiseta Premium</p>
                  <p className="text-sm text-gray-500">Tamanho M</p>
                </div>
              </div>

              {/* Preço + Lixeira */}
              <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-800">R$ 149,90</p>
                <button
                  className="text-gray-400 hover:text-red-500 transition duration-200"
                  title="Remover do carrinho"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-md p-4">
              {/* Produto */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Produto"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Camiseta Premium</p>
                  <p className="text-sm text-gray-500">Tamanho M</p>
                </div>
              </div>

              {/* Preço + Lixeira */}
              <div className="flex items-center gap-4">
                <p className="font-semibold text-gray-800">R$ 149,90</p>
                <button
                  className="text-gray-400 hover:text-red-500 transition duration-200"
                  title="Remover do carrinho"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-md p-4">
              <div className="flex-1 w-full">
                <label className="text-gray-900 font-medium text-sm mb-1 block">
                  Cupom de desconto
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Digite seu cupom"
                    className="border border-gray-200 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]"
                  />
                  <button className="absolute right-1.5 bg-primary-50 text-white font-medium px-5 py-2 rounded-md  transition duration-200 shadow-sm cursor-pointer">
                    Aplicar
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Utilize o cupom{" "}
                  <span className="font-semibold text-primary-50">1COMPRA</span>{" "}
                  para ganhar <strong>10% de desconto</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-gray-600">Frete</p>
              <p className="text-gray-800 font-medium">R$ 15,00</p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="text-gray-900 font-semibold text-lg">Total</p>
              <p className="text-primary-50 font-bold text-lg">R$ 164,90</p>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold">
                Segurança da Compra
              </h4>
              <p className="mt-2 text-gray-500">
                Sua compra é 100% segura. Utilizamos protocolos de criptografia
                e parceiros de pagamento confiáveis para garantir a proteção dos
                seus dados e transações.
              </p>
            </div>
          </div>
        </section>
    )
}