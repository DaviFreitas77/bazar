import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";
import { apiProcessPayment, apiProcessPaymentPix } from "@/api/payment.api";
import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
import { Loading } from "@/components/loading/loading";
import { PixQRCode } from "./PixQrCode";
import { createOrder } from "@/api/order.api";
export function PaymentMercadoPago() {
  const { state } = useCart();
 
  const { setStep,setPreference,preference } = useCheckout();
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  initMercadoPago("TEST-c87560f2-2e8e-439c-912f-ee65c7460423", {
    locale: "pt-BR",
  });

  useEffect(() => {
    const createPreference = async () => {
      const response = await createOrder(state);
      setPreference({
        id:response.preference.id,
        total:response.preference.total,
        orderId:response.preference.orderId
      });
     
    };
    createPreference();
  }, []);

  const initialization = {
    preferenceId:preference.id,
    amount: preference.total,
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
      setQrCodeBase64(response.point_of_interaction.transaction_data.qr_code_base64);
      setQrCode(response.point_of_interaction.transaction_data.qr_code);

      if (response.status === "approved") {
       
        setStep((prev) => prev + 1);
      }
      return;
    }

    // Caso seja cartão de crédito
    if (!preference.orderId) return;
    const response = await apiProcessPayment(formData, preference.orderId);
     console.log(response)
    if (response.status === "approved") {
       console.log(response)
      setStep((prev) => prev + 1);
    }
  };

  if (qrCodeBase64 && qrCode) {
    return <PixQRCode qrCode={qrCode} qrCodeBase64={qrCodeBase64} />;
  }
  if (!preference.id && !preference.total) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  }
  return <div className="w-full mt-10">{preference.total !== null && preference.id && <Payment customization={customization} initialization={initialization} onSubmit={handleSubmit} />}</div>;
}
