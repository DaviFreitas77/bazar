import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AdressSchema } from "@/schemas/schemaCheckout";
import { useCheckout } from "@/context/checkoutContext";
import { useEffect, useState } from "react";
import { createLogradouro, getZipCode } from "@/api/user.api";
import { Loading } from "@/components/loading/loading";
import { useLogradouro } from "@/hooks/useLogradouro";

export function Adress() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingCep, setLoadingCep] = useState<boolean>(false);
  const [newAdress, setNewAdress] = useState<boolean>(false);
  const { setIdLogradouro } = useCheckout();
  const { data: logradouroUser, isLoading: isLoadingLogradouro } = useLogradouro();

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
  const zip_code = watch("zip_code");
  const onSubmit = async (data: CheckoutProps.InformationsAdressProps) => {
    try {
      setLoading(true);
      const response = await createLogradouro(data);
      setIdLogradouro(response.id);
      setStep(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!zip_code || zip_code.length !== 8) {
      return;
    }
    const fetchAdress = async () => {
      setLoadingCep(true);
      try {
        const response = await getZipCode(zip_code);
        if (response) {
          setValue("city", response.localidade);
          setValue("state", response.uf);
          setValue("district", response.bairro);
          setValue("street", response.logradouro);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCep(false);
      }
    };

    fetchAdress();
  }, [zip_code]);

  const changeAdress = () => {
    setStep(3);
  };

  if (isLoadingLogradouro) {
    return (
      <div className="mt-10">
        <Loading />
      </div>
    );
  }
  return (
    <section className={`${logradouroUser ? "" : "border"}`}>
      <h4 className={`${logradouroUser.length > 0 ? "hidden" : "block"} text-gray-900 font-semibold `}>Endereço de entrega</h4>
      {logradouroUser?.length > 0 && !newAdress ? (
        <div>
          <h3 className="text-base mb-4 font-semibold mt-5 ">Seus endereços:</h3>

          <div onClick={changeAdress} className="space-y-3">
            {logradouroUser.map((item: any, i: any) => (
              <div onClick={() => setIdLogradouro(item.id)} key={i} className="border border-dashed border-gray-300 p-4 rounded-md shadow-sm text-sm hover:border-primary-50 cursor-pointer transition-colors duration-300">
                <p>
                  <strong>Rua:</strong> {item.street}
                </p>
                <p>
                  <strong>Número:</strong> {item.number}
                </p>
                <p>
                  <strong>Bairro:</strong> {item.district}
                </p>
                <p>
                  <strong>Cidade:</strong> {item.city} - {item.state}
                </p>
                <p>
                  <strong>CEP:</strong> {item.zip_code}
                </p>
              </div>
            ))}
          </div>
          <div className="pt-6 flex justify-between items-center">
            <button onClick={() => setStep((prev) => prev - 1)} type="button" className={` ${step === 1 ? "hidden" : "block"} bg-gray-200 hover:bg-primary-50 cursor-pointer  text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm `}>
              Voltar
            </button>
            <button onClick={() => setNewAdress(true)} className="bg-primary-50 text-white px-4 py-3 rounded-md hover:opacity-85 cursor-pointer">
              Adicionar novo endereço
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          {/* Nome e Sobrenome */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">CEP</label>
              <div className="relative">
                <input maxLength={8} {...register("zip_code")} type="text" placeholder="00000-000" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
                <div className="h-2 mt-1">{errors.zip_code && <span className="text-red-500 text-sm">{errors.zip_code.message}</span>}</div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Cidade</label>
              <div className="relative">
                <input {...register("city")} type="text" placeholder="Sua cidade" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
                {isLoadingCep && (
                  <div className="absolute right-3 top-6 -translate-y-1/2">
                    <Loading />
                  </div>
                )}
                <div className="h-2 mt-1">{errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Endereço</label>
              <div className="relative">
                <input {...register("street")} type="text" placeholder="Rua exemplo" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
                {isLoadingCep && (
                  <div className="absolute right-3 top-6 -translate-y-1/2">
                    <Loading />
                  </div>
                )}
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
                {isLoadingCep && (
                  <div className="absolute right-3 top-6 -translate-y-1/2">
                    <Loading />
                  </div>
                )}
                <div className="h-2 mt-1">{errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}</div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Estado</label>
              <div className="relative">
                <input {...register("state")} type="text" placeholder="São Paulo" className="border border-gray-200 py-3 pl-4 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-primary-100/40 transition duration-200 bg-[#F9FAFB]" />
                {isLoadingCep && (
                  <div className="absolute right-3 top-6 -translate-y-1/2">
                    <Loading />
                  </div>
                )}
                <div className="h-2 mt-1">{errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}</div>
              </div>
            </div>
          </div>

          {/* Botão */}
          <div className={` flex justify-between ${step === 4 ? "hidden" : "block"}`}>
            <button onClick={() => setStep((prev) => prev - 1)} type="button" className={` ${step === 1 ? "hidden" : "block"} bg-gray-200 hover:bg-primary-50 cursor-pointer  text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm `}>
              Voltar
            </button>

            <button type="submit" disabled={!isValid || isLoading} className={`bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm ${!isValid && "opacity-50"} ${isLoading && "opacity-50"}`}>
              Continuar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
