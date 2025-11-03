import { LiaShoppingBagSolid } from "react-icons/lia";
export function TitlePage(){
    return(
        <div className="flex items-center gap-3 mb-10  w-full  max-w-[1450px]">
                <div className="bg-[#F4EDE7] p-3 rounded-full text-primary-50 shadow-sm">
                  <LiaShoppingBagSolid size={22} />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900 font-semibold">
                    Finalize sua compra
                  </h2>
                  <p className="text-sm text-gray-500">
                    Conclua seu pedido em poucos segundos.
                  </p>
                </div>
              </div>
    )
}