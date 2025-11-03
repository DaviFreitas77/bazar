import { PeopleInformation } from "@/components/checkout/peopleInformation";
import { ChooseDelivery } from "@/components/checkout/delivery";

import { TitlePage } from "@/components/checkout/sub-component/titlePage";
import { Summary } from "@/components/checkout/sub-component/summary";
import { ProgressStep } from "@/components/checkout/progress";
import { useState } from "react";
import { Payment } from "@/components/checkout/payment";
import { PaymentConfirmed } from "@/components/checkout/paymentConfirmed";

export function Checkout() {
  const [step, setStep] = useState(1);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-2 md:px-6 py-12">
      <TitlePage />

      <ProgressStep step={step} />

      <div className="w-full max-w-7xl flex gap-10">
        <div className="w-full h-fit border border-gray-200 rounded-md">
          {step === 1 ? (
            <PeopleInformation />
          ) : step === 2 ? (
            <ChooseDelivery />
          ) : step === 3 ? (
            <Payment />
          ) : (
            <PaymentConfirmed />
          )}

          {/* Botão */}
          <div
            className={`m-8 flex justify-between ${step === 4 ? "hidden" : "block"
              }`}
          >
            <button
              onClick={() => setStep((prev) => prev - 1)}
              className={` ${step === 1 ? "hidden" : "block"
                } bg-gray-200 hover:bg-primary-50 cursor-pointer  text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm `}
            >
              Voltar
            </button>

            <button
              onClick={() => setStep((prev) => prev + 1)}
              className="bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm"
            >
              Continuar
            </button>
          </div>
        </div>

        <Summary />
      </div>
    </main>
  );
}
