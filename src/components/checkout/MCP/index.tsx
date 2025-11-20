import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";
import { apiCreatePreference, apiProcessPayment, apiProcessPaymentPix } from "@/api/payment.api";
import { useCart } from "@/context/cartContext";
export function PaymentMercadoPago() {
  const {state} = useCart()
  const [amount,setAmount] = useState(0)
  const [preferenceId, setPreferenceId] = useState("");
  initMercadoPago("TEST-c87560f2-2e8e-439c-912f-ee65c7460423", {
    locale: "pt-BR",
  });

  useEffect(() => {
    const createPreference = async () => {
      const response = await apiCreatePreference(state);
      console.log(response)
      setPreferenceId(response.id);
      setAmount(response.total)
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
      console.log("PIX:", response);
      return;
    }

    // Caso seja cartão de crédito
    const response = await apiProcessPayment(formData);
    console.log("Cartão:", response);
  };

  return (
    <div className="w-full mt-10">
      <Payment customization={customization} initialization={initialization} onSubmit={handleSubmit} />
    </div>
  );
}
