import { useCheckout } from "@/context/checkoutContext";
import { api } from "@/lib/api";
import { useState } from "react";
import { Loading } from "../loading/loading";

export function ApplyCupom({ step }: { step: number }) {
  const { setDiscount, discount, setPreference, preference } = useCheckout();
  const [nameCupom, setNameCupom] = useState("");
  const [errorCupom, setErrorCupom] = useState("");
  const [loading, setLoading] = useState(false);

  const useCupom = async () => {
    setLoading(true);
    setErrorCupom("");
    try {
      const response = await api.post("cupom/useCupom", { nameCupom, order: preference.orderId });
      if (response.status === 200) {
        setNameCupom("");
        setDiscount(Number(response.data.discount));
        console.log(response.data);
        setPreference({
          id: response.data.preference.id,
          total: response.data.preference.total,
          orderId: response.data.preference.orderId,
        });
      }
    } catch (error: any) {
      setErrorCupom(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-md p-4">
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary-50 rounded-full w-5 h-5 flex justify-center items-center font-bold text-white">%</div>

          <label className="text-primary-100 font-medium text-sm mb-1 block">Cupom de desconto</label>
        </div>

        <div className={`relative flex items-center ${step === 3 ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
          {discount ? (
            <div className="border border-green-200 px-4 py-3 w-full rounded-md bg-green-100 text-green-800 font-semibold text-xs">CUPOM APLICADO</div>
          ) : (
            <>
              <input onChange={(e) => setNameCupom(e.target.value)} type="text" placeholder="Digite seu cupom" className="border border-gray-200 px-4 py-3 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]" />
              {errorCupom && <p className="text-xs font-bold  text-red-500 mt-1 absolute top-full">{errorCupom}</p>}
            </>
          )}

          {discount ? null : (
            <button onClick={useCupom} className="absolute right-1.5 bg-primary-50 text-white font-medium min-w-20  min-h-10 rounded-md  transition duration-200 shadow-sm cursor-pointer">
              {loading ? <Loading /> : "Aplicar"}
            </button>
          )}
        </div>

        {step === 3 ? (
          <p className="text-sm text-gray-500 mt-6">
            Utilize o cupom <span className="font-semibold text-primary-50">PRIMEIRA10</span> para ganhar <strong>10% de desconto</strong>.
          </p>
        ) : (
          <p className="text-sm text-primary-50 mt-2">Utilize seu cupom nas próximas etapas.</p>
        )}
      </div>
    </div>
  );
}
