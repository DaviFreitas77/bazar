import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";
import { apiProcessPayment, apiProcessPaymentPix } from "@/api/site/payment.api";
import { useCart } from "@/context/cartContext";
import { useCheckout } from "@/context/checkoutContext";
import { Loading } from "@/components/site/loading/loading";
import { PixQRCode } from "./PixQrCode";
import { apiLatestOrder, createOrder } from "@/api/site/order.api";
import { useUser } from "@/context/userContext";

const publicKey = "TEST-963bf96a-8793-4051-8c3b-67f65002ac60";

initMercadoPago(publicKey, {
  locale: "pt-BR",
});
export function PaymentMercadoPago() {
  const { state } = useCart();
  const { setStep, setPreference, preference, idLogradouro } = useCheckout();
  const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { name, email, lastName } = useUser();

  useEffect(() => {
    const createPreference = async () => {
      if (!preference.id) {
        const response = await createOrder(state, idLogradouro);
        console.log(response);
        setPreference({
          id: response.preference.id,
          total: response.preference.total,
          orderId: response.preference.orderId,
          created_at: response.created_at,
        });
      }
    };
    createPreference();
  }, [state, preference.id]);

  useEffect(() => {
    if (!preference.orderId) return;

    const interval = setInterval(async () => {
      try {
        const response = await apiLatestOrder();
        if (response.status === "paid") {
          clearInterval(interval);
          setStep((prev) => prev + 1);
        }

        if (response.status === "canceled") {
          setStep(5);
          setPreference({
            id: "",
            total: 0,
            orderId: "",
            created_at: "",
          });
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [preference.orderId]);

  const initialization = {
    preferenceId: preference.id,
    amount: Number(preference.total.toFixed(2)),
    payer: {
      firstName: name || "",
      lastName: email || "",
      email: lastName || "",
    },
  };
  const customization = {
    paymentMethods: {
      bankTransfer: ["all"],
      creditCard: ["all"],
    },
    visual: {},
  };
  const handleSubmit = async ({ formData, selectedPaymentMethod }: any) => {
    if (!preference.orderId) return;

    if (selectedPaymentMethod === "bank_transfer") {
      const response = await apiProcessPaymentPix(formData, preference.orderId);

      setQrCodeBase64(response.point_of_interaction.transaction_data.qr_code_base64);

      setQrCode(response.point_of_interaction.transaction_data.qr_code);

      return;
    }

    const response = await apiProcessPayment(formData, preference.orderId);

    if (response.payment.status === "approved") {
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
