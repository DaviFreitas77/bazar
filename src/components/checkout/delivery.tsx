import { LiaShoppingBagSolid } from "react-icons/lia";
import { CiDeliveryTruck } from "react-icons/ci";
import { Choose } from "./sub-component/chooseDelivery";
import { Adress } from "./sub-component/adress";
import { Remove } from "./sub-component/remove";
export function ChooseDelivery() {
  return (
    <section className="lg:col-span-2">
     

      <div className="border border-gray-200 bg-white shadow-sm p-8 rounded-md">
        {/* Título */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiDeliveryTruck size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              Método de entrega
            </p>
            <p className="text-sm text-gray-400">
              Selecione a forma de entrega do seu pedido.
            </p>
          </div>
        </div>

        <Choose />

        <Adress/>
        {/* <Remove /> */}

        {/* Botão */}
        <div className="mt-8 flex justify-end">
          <button className="bg-primary-50 hover:opacity-85 cursor-pointer text-white font-medium px-8 py-3 rounded-md  transition duration-200 shadow-sm">
            Continuar
          </button>
        </div>
      </div>
    </section>
  );
}
