import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
import { MdAutorenew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface PaymentProcessingProps {
  numberOrder: string;
}

export function PaymentProcessing({ numberOrder }: PaymentProcessingProps) {
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
        <div className="bg-blue-100 p-2 rounded-full text-blue-700">
          <MdAutorenew size={40} />
        </div>
        <div className="text-center">
          <p className="text-2xl mt-2">Pagamento em processamento</p>
          <p className="text-gray-600 mt-5">
            Seu pagamento está sendo analisado. Avisaremos assim que houver uma atualização.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 max-w-md mx-auto mt-5">
          <p className="text-blue-800 font-semibold">
            Número do pedido: #{numberOrder}
          </p>
          <p className="text-blue-700 text-sm mt-1">
            Você pode acompanhar o status em seus pedidos.
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
