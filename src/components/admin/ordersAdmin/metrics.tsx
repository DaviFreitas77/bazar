export function Metrics() {
  return (
    <section className="w-full px-4 py-4">
      <div className="border border-gray-200 rounded-lg p-4 bg-white ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200 ">
          {/* Total de produtos */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <span className="text-gray-800 font-semibold text-base">Total de Pedidos</span>
            <span className="text-2xl font-bold text-gray-700">120</span>
            <span className="text-green-600 text-base">+10% vs mês anterior</span>
          </div>

          {/* Vendas no site */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <span className="text-gray-800 font-semibold text-base">Total de vendas</span>
            <span className="text-2xl font-bold text-gray-700">R$ 5.200</span>
            <span className="text-green-600 text-base">+10% vs mês anterior</span>
          </div>

          {/* Vendas fora do site */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <span className="text-gray-800 font-semibold text-base">Vendas fora do site</span>
            <span className="text-2xl font-bold text-gray-700">R$ 3.250</span>
            <span className="text-green-600 text-base">+6% vs mês anterior</span>
          </div>

          {/* Categoria mais vendida */}
          <div className="flex flex-col gap-2 px-4 py-4">
            <span className="text-gray-800 font-semibold text-base">Categoria mais vendida</span>
            <span className="text-2xl font-bold text-gray-700">Acessórios</span>
            <span className="text-gray-500 text-base">neste mês</span>
          </div>
        </div>
      </div>
    </section>
  );
}
