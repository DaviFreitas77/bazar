import { CiDeliveryTruck } from "react-icons/ci";

export function Choose(){
    return(
        <section> 
             <div className="flex items-center gap-4 mt-4 bg-primary-50/20 py-4 px-2 rounded-sm border border-primary-50">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiDeliveryTruck size={30} />
          </div>
          <div>
            <p className="text-black text-base font-semibold">
              Entregar em casa
            </p>
            <p className="text-xs text-gray-600">Receba rápido na sua casa</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2  py-4 px-2 rounded-sm border border-gray-200 bg-[#F9FAFB]">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiDeliveryTruck size={30} />
          </div>
          <div>
            <p className="text-gray-400 text-base">Retirar</p>
            <p className="text-xs text-gray-600">
              Passe para buscar no endereço
            </p>
 
          </div>
        </div>
        </section>
    )
}