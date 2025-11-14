import { apiCreatePayment } from "@/api/payment.api";
import { useCheckout } from "@/context/checkoutContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useEffect, useState } from "react";
import { CheckoutForm } from "./checkoutForm";
const stripePromise = loadStripe("pk_test_51SQZpyBN6OX7QGoMcLis0UIgqie00z0KlQy5PJB72bLtRBqC04BTwV448GQsaetEXns0ysijpqEQTUtGQ1zp1NFM000M6JfP22");
export function PaymentCard() {
  const { step, setStep } = useCheckout();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPayment = async () => {
      try {
        const response = await apiCreatePayment(100);
        setClientSecret(response.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    createPayment();
  }, []);

  return (
    <section className="border mt-4 px-4 rounded-md py-5 border-gray-200">
      <h4 className="text-gray-900  text-lg">Dados do cartão</h4>{" "}
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
          <CheckoutForm step={step} setStep={setStep} />
        </Elements>
      ) : (
        <p>Carregando...</p>
      )}
    </section>
  );
}
