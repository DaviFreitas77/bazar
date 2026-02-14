import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
import { MdDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface orderCanceledProps{
  numberOrder:string
}
export function OrderCanceled({numberOrder}:orderCanceledProps) {
  const navigate = useNavigate();
  const {dispatch} =  useCart()
  const {setStep} = useCheckout()
  
  
    const handleConfirm = () => {
      setStep(1);
      dispatch({ type: "clear" }); 
      navigate("/"); 
  };
  return (
    <section className=" justify-center items-center flex py-10 flex-col gap-15">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-red-400  p-2 rounded-full text-white mb-2">
          <MdDone size={40} />
        </div>
        <div className="text-center">
          <p className="text-2xl mt-2 font-light ">Pagamento não concluido !</p>
          <p className="text-gray-600 mt-5">
            O tempo para pagamento do seu pedido expirou ou o pagamento foi recusado.
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200 max-w-md mx-auto mt-5">
          <p className="text-red-400 font-semibold">
            Número do pedido: #{numberOrder}
          </p>
          <p className="text-red-500 text-sm mt-1">
            Seu pedido foi cancelado.
          </p>
        </div>
      </div>

      <div className="w-full px-4">
          <button 
          onClick={handleConfirm}
          className="bg-primary-50 hover:opacity-85 text-white font-medium transition duration-200 shadow-sm cursor-pointer w-full lg:max-w-50 px-10 py-3 rounded-md">
            Voltar
          </button>
      </div>
    </section>
  );
}
