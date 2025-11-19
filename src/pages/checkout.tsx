import { PeopleInformation } from "@/components/checkout/peopleInformation";
import { ChooseDelivery } from "@/components/checkout/delivery";

import { TitlePage } from "@/components/checkout/sub-component/titlePage";
import { Summary } from "@/components/checkout/sub-component/summary";
import { ProgressStep } from "@/components/checkout/progress";
import { Payment } from "@/components/checkout/payment";
import { PaymentConfirmed } from "@/components/checkout/paymentConfirmed";
import { useCheckout } from "@/context/checkoutContext";
import { useMemo } from "react";

import { useCart } from "@/context/cartContext";

export function Checkout() {
  const { step } = useCheckout();
  const { state } = useCart();
  
  const orderConfirmed = step === 4;
  const total = useMemo(() => {
    const prices = state.map((item) => item.price * item.quantity);
    const sum = prices.reduce((a, b) => a + b, 0);
    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }, [state]);


  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-2 md:px-6 py-12">
      <TitlePage />

      <ProgressStep step={step} />

      <div className="w-full max-w-7xl flex gap-10">
        <div className="w-full h-fit border border-gray-200 rounded-md">{step === 1 ? <PeopleInformation /> : step === 2 ? <ChooseDelivery /> : step === 3 ? <Payment /> : <PaymentConfirmed />}</div>

        <Summary products={state} total={total} isConfirmed={orderConfirmed} />
      </div>
    </main>
  );
}
