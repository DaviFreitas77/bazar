import { CiCircleAlert } from "react-icons/ci";
export function TotalShoppingCart(){
    return(
        
            <section className="flex flex-col gap-2 absolute bottom-0 w-[90%]">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                    <CiCircleAlert size={30}/>
                    O valor final, incluindo os descontos e fretes, será calculado na próxima etapa.</p>
                <div className="flex flex-col gap-2   border-t py-4 border-gray-200">
                    <div className="flex justify-between">
                        <p className="font-semibold text-lg">Total</p>
                        <p className="text-primary-50 font-semibold">R$ 300,00</p>
                    </div>
                    <button className="w-full px-8 bg-primary-50 py-3 text-white rounded-sm cursor-pointer hover:opacity-85">Finalizar Comprar</button>
                </div>
            </section>
    )
}