import { useCheckout } from "@/context/checkoutContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PaymentCardSchema } from "@/schemas/schemaCheckout";

export function PaymentCard() {
  const { step, setStep } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutProps.InformationPaymentCardProps>({
    resolver: yupResolver(PaymentCardSchema),
  });

  const onSubmit = (data: CheckoutProps.InformationPaymentCardProps) => {
    console.log(data);
    setStep(4);
  };
  return (
    <section className="border mt-4 px-4 rounded-md py-5 border-gray-200">
      <h4 className="text-gray-900  text-lg">Dados do cartão</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
        {/* Nome e Sobrenome */}

        <div className="flex flex-col w-full gap-1">
          <label className="text-gray-500 font-medium text-sm">
            Número do cartão
          </label>
          <div className="relative">
            <input
              {...register("numberCard")}
              type="text"
              placeholder="0000 0000 0000 0000"
              className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
            />
            <div className="h-2 mt-1">
              {errors.numberCard && (
                <span className="text-red-500 text-sm">
                  {errors.numberCard.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500  font-medium text-sm">
              Validade
            </label>
            <div className="relative">
              <input
                {...register("dateCard")}
                type="text"
                placeholder="MM/AA"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
              <div className="h-2 mt-1">
                {errors.dateCard && (
                  <span className="text-red-500 text-sm">
                    {errors.dateCard.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-500  font-medium text-sm">CVV</label>
            <div className="relative">
              <input
                {...register("CVVCard")}
                type="number"
                placeholder="123"
                className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
              />
              <div className="h-2 mt-1">
                {errors.CVVCard && (
                  <span className="text-red-500 text-sm">
                    {errors.CVVCard.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <label className="text-gray-500  font-medium text-sm">
            Nome no cartão
          </label>
          <div className="relative">
            <input
              {...register("nameCard")}
              type="text"
              placeholder="Nome salvo no cartão"
              className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]"
            />
            <div className="h-2 mt-1">
              {errors.nameCard && (
                <span className="text-red-500 text-sm">
                  {errors.nameCard.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={` flex justify-between ${step === 4 ? "hidden" : "block"}`}
        >
          <button
            onClick={() => setStep((prev) => prev - 1)}
            type="button"
            className={` ${
              step === 1 ? "hidden" : "block"
            } bg-gray-200 hover:bg-primary-50 cursor-pointer  text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm `}
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm ${
              !isValid && "opacity-50"
            }`}
          >
            Continuar
          </button>
        </div>
      </form>
    </section>
  );
}
