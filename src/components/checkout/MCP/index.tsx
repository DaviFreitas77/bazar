import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";
import { apiCreatePreference, apiProcessPayment, apiProcessPaymentPix } from "@/api/payment.api";
import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
export function PaymentMercadoPago() {
  const { state } = useCart();
  const [amount, setAmount] = useState(0);
  const [preferenceId, setPreferenceId] = useState("");
  const [order,setOrder] = useState("")
  const {setStep} = useCheckout();
  initMercadoPago("TEST-c87560f2-2e8e-439c-912f-ee65c7460423", {
    locale: "pt-BR",
  });

  useEffect(() => {
    const createPreference = async () => {
      const response = await apiCreatePreference(state);
      setPreferenceId(response.id);
      setAmount(response.total);
      setOrder(response.order)
    };
    createPreference();
  }, [state]);

  const initialization = {
    preferenceId,
    amount: amount,
  };
  const customization = {
    paymentMethods: {
      ticket: ["all"],
      bankTransfer: ["all"],
      creditCard: ["all"],
    },
    visual: {},
  };
  const handleSubmit = async ({ formData, selectedPaymentMethod }: any) => {
    if (selectedPaymentMethod === "bank_transfer") {
      const response = await apiProcessPaymentPix(formData);
      if(response.status === "approved"){
        setStep(prev=> prev+1)
        
      }
      return;
    }
    // Caso seja cartão de crédito
    const response = await apiProcessPayment(formData,order);
     if(response.status === "approved"){
        setStep(prev=> prev+1)
      }
    console.log("Cartão:", response);
  };

  return <div className="w-full mt-10">{amount !== null && preferenceId && <Payment customization={customization} initialization={initialization} onSubmit={handleSubmit} />}</div>;
}
