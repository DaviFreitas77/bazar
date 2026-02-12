import { CiDeliveryTruck } from "react-icons/ci";
import { ChoosePayment } from "./sub-component/choosePaymento";
import { useEffect, useRef } from "react";
export function Payment() {
  const secondsRef = useRef(59);
  const minutesRef = useRef(15);

  const timerSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (minutesRef.current !== 0 || secondsRef.current !== 0) {
        if (minutesRef.current == 0 && secondsRef.current == 0) {
          console.log("acabou");
          return;
        }
        if (secondsRef.current == 0) {
          minutesRef.current--;
          secondsRef.current = 59;
        } else {
          secondsRef.current--;
        }
      }
      if (timerSpanRef.current) {
        timerSpanRef.current.textContent = `${minutesRef.current}:${secondsRef.current < 10 ? "0" + secondsRef.current : secondsRef.current}`;

        if (minutesRef.current == 0 && secondsRef.current < 10) {
          timerSpanRef.current.classList.remove("text-green-900");
          timerSpanRef.current.classList.add("text-red-500");
        } else {
   
          timerSpanRef.current.classList.add("text-green-900");
          timerSpanRef.current.classList.remove("text-red-500");
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="lg:col-span-2">
      <div className="p-5 md:p-8 rounded-md">
        {/* Título */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiDeliveryTruck size={22} />
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <p className="font-semibold text-gray-900 text-lg">Método de pagamento</p>
              <p className="text-sm text-gray-400">Selecione a forma de pagemento desejada</p>
            </div>
            {minutesRef && secondsRef && (
              <span ref={timerSpanRef} className="font-semibold text-green-900 text-lg">
                {minutesRef.current}:{secondsRef.current}
              </span>
            )}
          </div>
        </div>
        <ChoosePayment />
      </div>
    </section>
  );
}
