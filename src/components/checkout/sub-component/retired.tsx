import { useCheckout } from "@/context/checkoutContext";

export function Retired() {
  const {setStep} = useCheckout();
  return (
    <section>
      <div className="border border-dashed border-gray-300 rounded-md shadow-sm text-sm p-4 mt-4 bg-white hover:border-primary-50 cursor-pointer transition-colors duration-300 ">
        <h2 className="text-sm font-semibold mb-4">Endereço de retirada</h2>

        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-900">Cidade</label>
          <p className="text-gray-900">São Paulo</p>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-bold text-gray-900">Bairro</label>
          <p className="text-gray-900">exemplo</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-900">Endereço</label>
          <p className="text-gray-600">Rua exemplo, 108</p>
        </div>
      </div>
      <div>
        <p className="text-sm mt-5">
          <span className="font-bold">Observação</span>: Apresente o número do seu pedido ao chegar no local de retirada.
        </p>

        <p className="text-sm mt-4">
          <span className="font-bold">Horário para retirada:</span>
          Segunda a sexta-feira, das 10h às 18h
        </p>
      </div>
      <div className="flex items-end justify-end">
        <button 
        onClick={()=>setStep(prev => prev+1)}
        type="submit" className={`bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm mt-5 `}>
          Continuar
        </button>
      </div>
    </section>
  );
}
