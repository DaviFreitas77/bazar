import { apiChangeStatusOrder } from "@/api/payment.api";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface CheckoutProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function CheckoutForm({ step, setStep }: CheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.log("Stripe ainda não carregou");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/sucesso",
      },
      redirect: "if_required",
    });
    setLoading(false);

    if (error) {
      console.log("Erro ao confirmar pagamento:", error.message);
    }

    if (paymentIntent?.status === "succeeded") {
      const changeStatusOrder = async () => {
        try {
          await apiChangeStatusOrder();
         
        } catch (error) {
          console.log(error)
        }
      }
      changeStatusOrder()
      setStep((prev) => prev + 1);
    }
  };

  return (
    <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
      <PaymentElement />

      <div className={`flex justify-between ${step === 4 ? "hidden" : "block"}`}>
        <button onClick={() => setStep((prev) => prev - 1)} type="button" className={`${step === 1 ? "hidden" : "block"} bg-gray-200 text-white px-8 py-3 rounded-md`}>
          Voltar
        </button>

        <button type="submit" disabled={loading} className="bg-primary-50 text-white px-8 py-3 rounded-md">
          {loading ? "Processando..." : "Continuar"}
        </button>
      </div>
    </form>
  );
}
