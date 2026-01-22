import { Pencil } from "lucide-react";

export function FinancialCard() {
  return (
      <section className="w-full ">
        <div className="bg-white w-full rounded-md border border-gray-200 max-w-xl p-5  h-auto">
          <div>
            <h1 className="text-gray-800 font-semibold">Financeiro</h1>
            <div className="flex items-center justify-between">
              <h2>
                Meta do mês <span className="text-primary-50 font-semibold">R$ 200,00</span>
              </h2>
              <Pencil size={16} />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <p>Cartão</p>
              </div>
              <p className="text-primary-50 font-semibold">R$ 100,00</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#3D9386] rounded-full"></div>
                <p>Pix</p>
              </div>
              <p className="text-primary-50 font-semibold">R$ 100,00</p>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#EF7296] rounded-full"></div>
                <p>Boleto</p>
              </div>
              <p className="text-primary-50 font-semibold">R$ 100,00</p>
            </div>
          </div>
        </div>
      </section>
  );
}
