export function PaymentCard() {
  return (
    <section className="border mt-4 px-4 rounded-md py-5 border-gray-200">
      <h4 className="text-gray-900  text-lg">Dados do cartão</h4>
      <div className="mt-4 space-y-5">
        {/* Nome e Sobrenome */}
     
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500 font-medium text-sm">Número do cartão</label>
            <div className="relative">
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500  font-medium text-sm">
              Validade
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="MM/AA"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500  font-medium text-sm">CVV</label>
            <div className="relative">
              <input
                type="number"
                placeholder="123"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>
      
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500  font-medium text-sm">Nome no cartão</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Nome salvo no cartão"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
      </div>
    </section>
  );
}
