import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AdressSchema } from "@/schemas/schemaCheckout";
import { useCheckout } from "@/context/checkoutContext";
import { useEffect } from "react";
import { getZipCode } from "@/api/user.api";

export function Adress() {
  const { step, setStep } = useCheckout();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutProps.InformationsAdressProps>({
    resolver: yupResolver(AdressSchema),
  });
  const cep = watch("cep");
  const onSubmit = async (data: CheckoutProps.InformationsAdressProps) => {
    setStep(3);
  };

  useEffect(() => {
    const fetchAdress = async () => {
        if (!cep || cep.length !== 8) return;
      try {
        const response = await getZipCode(cep);
        if(response) {
          setValue("city", response.localidade);
          setValue("state", response.uf);
          setValue("district", response.bairro);
          setValue("street", response.logradouro);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdress();
  }, [cep]);

  return (
    <section className="border mt-4 px-4 rounded-md py-5 border-gray-200">
      <h4 className="text-gray-900 font-semibold ">Endereço de entrega</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
        {/* Nome e Sobrenome */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Cep</label>
            <div className="relative">
              <input maxLength={8} {...register("cep")} type="text" placeholder="00000-000" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.cep && <span className="text-red-500 text-sm">{errors.cep.message}</span>}</div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Cidade</label>
            <div className="relative">
              <input {...register("city")} type="text" placeholder="Sua cidade" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Endereço</label>
            <div className="relative">
              <input {...register("street")} type="text" placeholder="Rua exemplo" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.street && <span className="text-red-500 text-sm">{errors.street.message}</span>}</div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Número</label>
            <div className="relative">
              <input {...register("number")} type="number" placeholder="10" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.number && <span className="text-red-500 text-sm">{errors.number.message}</span>}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Bairro</label>
            <div className="relative">
              <input {...register("district")} type="text" placeholder="Seu bairro" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}</div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Estado</label>
            <div className="relative">
              <input {...register("state")} type="text" placeholder="São Paulo" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}</div>
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className={` flex justify-between ${step === 4 ? "hidden" : "block"}`}>
          <button onClick={() => setStep((prev) => prev - 1)} type="button" className={` ${step === 1 ? "hidden" : "block"} bg-gray-200 hover:bg-primary-50 cursor-pointer  text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm `}>
            Voltar
          </button>

          <button type="submit" disabled={!isValid} className={`bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm ${!isValid && "opacity-50"}`}>
            Continuar
          </button>
        </div>
      </form>
    </section>
  );
}
