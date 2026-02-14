import { CiDeliveryTruck } from "react-icons/ci";
import { ChoosePayment } from "./sub-component/choosePaymento";
import { Timer } from "./timer";
import { useCheckout } from "@/context/checkoutContext";

export function Payment() {
  const { preference } = useCheckout();

  
  return (
    <section className="lg:col-span-2">
      <div className="p-5 md:p-8 rounded-md">
        {/* Título */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiDeliveryTruck size={22} />
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-semibold text-gray-900 text-lg">Método de pagamento</p>
              <p className="text-sm text-gray-400">Selecione a forma de pagemento desejada</p>
            </div>
            {preference.created_at && (
              
            <Timer createdAt={preference.created_at} />
            )}
          </div>
        </div>
        <ChoosePayment />
      </div>
    </section>
  );
}
