
import { CiDeliveryTruck } from "react-icons/ci";
import { Choose } from "./sub-component/chooseDelivery";
import { Adress } from "./sub-component/adress";

export function ChooseDelivery() {
  return (
    <section className="lg:col-span-2">
      <div className="p-5 md:p-8 rounded-md">
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

        <Adress />
  

       
      </div>
    </section>
  );
}
