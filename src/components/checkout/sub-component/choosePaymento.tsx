
import { FiCreditCard } from "react-icons/fi";
import { PiPixLogoThin } from "react-icons/pi";
export function ChoosePayment(){
    return(
        <section> 
             <div className="flex items-center bg-[#F4EDE7]   gap-4 mt-4 py-4 px-2 rounded-sm border border-primary-50">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <PiPixLogoThin   size={30} />
          </div>
          <div>
            <p className="text-black  text-base  font-semibold">
              PIX
            </p>
            <p className="text-sm text-gray-600">Pagemento instantâneo</p>
          </div>
        </div>

        <div className="flex items-center  gap-4 mt-2  py-4 px-2 rounded-sm border border-gray-200">
          <div className=" p-2 rounded-full text-gray-400">
           <FiCreditCard size={30} />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-base">Cartão de crédito</p>
            <p className="text-sm text-gray-600">
              Visa,Mastercard,Elo
            </p>
 
          </div>
        </div>
        </section>
    )
}