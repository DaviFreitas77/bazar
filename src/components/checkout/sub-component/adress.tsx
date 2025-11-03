export function Adress() {
  return (
    <section className="border mt-4 px-4 rounded-md py-5 border-gray-200">
      <h4 className="text-gray-900 font-semibold ">Endereço de entrega</h4>
      <div className="mt-4 space-y-5">
        {/* Nome e Sobrenome */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Cep</label>
            <div className="relative">
              <input
                type="text"
                placeholder="00000-000"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Cidade</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Sua cidade"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">
              Endereço
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Rua exemplo"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Número</label>
            <div className="relative">
              <input
                type="text"
                placeholder="10"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Bairro</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Seu bairro"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Estado</label>
            <div className="relative">
              <input
                type="text"
                placeholder="São Paulo"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
