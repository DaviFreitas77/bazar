import { CiDeliveryTruck } from "react-icons/ci";
import type { ChooseDelivery } from "../delivery";

interface ChooseProps {
  chooseDelivery: ChooseDelivery;
  setChooseDelivery: React.Dispatch<React.SetStateAction<ChooseDelivery>>;
}
export function Choose({ chooseDelivery, setChooseDelivery }: ChooseProps) {
  return (
    <section>
      <div
        onClick={() => setChooseDelivery("retired")}
        className={`${chooseDelivery == "retired" ? "flex items-center gap-4 mt-4 bg-primary-50/20 py-4 px-2 rounded-sm border border-primary-50" : "flex items-center gap-4 mt-2  py-4 px-2 rounded-sm border border-gray-200 bg-[#F9FAFB]"} cursor-pointer`}
      >
        <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
          <CiDeliveryTruck size={30} />
        </div>
        <div>
          <p className={`${chooseDelivery == "retired" ? "text-black text-base font-semibold" : "text-gray-400 text-base"}`}>Retirar</p>
          <p className="text-xs text-gray-600">Passe para buscar no endereço</p>
        </div>
      </div>
      <div
        onClick={() => setChooseDelivery("delivery")}
        className={`${chooseDelivery == "delivery" ? "flex items-center gap-4 mt-4 bg-primary-50/20 py-4 px-2 rounded-sm border border-primary-50" : "flex items-center gap-4 mt-2  py-4 px-2 rounded-sm border border-gray-200 bg-[#F9FAFB]"} cursor-pointer`}
      >
        <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
          <CiDeliveryTruck size={30} />
        </div>
        <div>
          <p className={`${chooseDelivery == "delivery" ? "text-black text-base font-semibold" : "text-gray-400 text-base"}`}>Entregar em casa</p>
          <p className="text-xs text-gray-600">Receba rápido na sua casa</p>
        </div>
      </div>
    </section>
  );
}
