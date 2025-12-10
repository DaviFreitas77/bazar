import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { useMemo, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { ModalAuth } from "../auth/modalAuth";
import { useNavigate } from "react-router-dom";
import { useUI } from "@/context/UIContext";

export function TotalShoppingCart() {
  const navigation = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { name } = useUser();
  const { state } = useCart();
  const { setOpenCart } = useUI();
  const subtotal = useMemo(() => {
    const prices = state.map((item) => item.price * item.quantity);
    const sum = prices.reduce((a, b) => a + b, 0);
    return sum;
  }, [state]);

  const goCheckout = () => {
    if (!name) {
      setShowModal(true);
      return;
    }
    navigation("/checkout");
    setOpenCart(false);
  };

  return (
    <section className="flex flex-col gap-2 absolute bottom-0 w-[90%]">
      <p className="text-sm text-gray-400 flex items-center gap-2">
        <CiCircleAlert size={30} />O valor final, incluindo os descontos e fretes, será calculado na próxima etapa.
      </p>
      <div className="flex flex-col gap-2   border-t py-4 border-gray-200">
        <div className="flex justify-between">
          <p
            className="font-semibold text-base
                        text-gray-800"
          >
            Total
          </p>
          <p className="text-primary-50 font-semibold">{subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
        </div>
        <button
          onClick={() => {
            goCheckout();
          }}
          disabled={state.length === 0}
          className={`
    w-full px-8 py-3 rounded-sm text-white font-medium
    transition-all duration-300
    ${state.length === 0 ? "bg-gray-300 cursor-not-allowed opacity-60" : "bg-primary-50 hover:bg-primary-100 cursor-pointer"}
  `}
        >
          Finalizar Compra
        </button>
      </div>
      <ModalAuth open={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
