import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
import { MdSchedule } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PaymentPendingProps {
  numberOrder: string;
}

export function PaymentPending({ numberOrder }: PaymentPendingProps) {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { setStep } = useCheckout();

  const handleTrackOrder = () => {
    dispatch({ type: "clear" });
    setStep(1);
    navigate("/pedidos");
  };

  return (
    <section className="justify-center items-center flex py-10 flex-col gap-15">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-amber-100 p-2 rounded-full text-amber-700">
          <MdSchedule size={40} />
        </div>
        <div className="text-center">
          <p className="text-2xl mt-2">Pagamento pendente</p>
          <p className="text-gray-600 mt-5">
            Estamos aguardando a confirmação do seu pagamento.
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 max-w-md mx-auto mt-5">
          <p className="text-amber-800 font-semibold">
            Número do pedido: #{numberOrder}
          </p>
          <p className="text-amber-700 text-sm mt-1">
            Você pode acompanhar qualquer atualização em seus pedidos.
          </p>
        </div>
      </div>

      <div className="w-full px-4">
        <button
          onClick={handleTrackOrder}
          className="bg-primary-50 hover:bg-primary-100 text-white font-medium transition duration-200 shadow-sm cursor-pointer px-10 py-3 rounded-md"
        >
          Acompanhar pedido
        </button>
      </div>
    </section>
  );
}
