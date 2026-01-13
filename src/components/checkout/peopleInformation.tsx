import { CiUser } from "react-icons/ci";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { PeopleInformationSchema } from "@/schemas/schemaCheckout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCheckout } from "@/context/checkoutContext";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { updateUser } from "@/api/user.api";

export function PeopleInformation() {
  const { setStep } = useCheckout();
  const { name, email, lastName, tel,setTel} = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CheckoutProps.InformationsProps>({
    resolver: yupResolver(PeopleInformationSchema),
  });

  const onSubmit = async (data: CheckoutProps.InformationsProps) => {
    if (tel == null) {
      try {
        const response = await updateUser({ tel: data.phone });
        setTel(response.user.tel);
      } catch (error) {
        return console.log(error);
      }
    }

    setStep(2);
  };

  useEffect(() => {
    if (name) setValue("name", name);
    if (lastName) setValue("lastName", lastName);
    if (email) setValue("email", email);
    if (tel) setValue("phone", tel);
    trigger();
  }, [name, lastName, email, tel, setValue]);

  return (
    <section className="lg:col-span-2">
      {/* Formulário */}
      <div className="px-5 py-6 md:p-8 rounded-md">
        {/* Título */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiUser size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">Informações Pessoais</p>
            <p className="text-sm text-gray-400">Preencha seus dados para continuar.</p>
          </div>
        </div>

        {/* Inputs */}
        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Nome e Sobrenome */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Nome</label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-6 -translate-y-1/2 text-gray-400" />

                <input {...register("name")} readOnly={!!name} type="text" placeholder="Seu nome" className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]" />
                <div className="h-2 mt-1">{errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}</div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Sobrenome</label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-6 -translate-y-1/2 text-gray-400" />
                <input {...register("lastName")} readOnly={!!lastName} type="text" placeholder="Seu sobrenome" className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]" />
                <div className="h-2 mt-1">{errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}</div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Email</label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-6 -translate-y-1/2 text-gray-400" />
              <input {...register("email")} readOnly={!!email} type="email" placeholder="seuemail@gmail.com" className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]" />

              <div className="h-2 mt-1">{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}</div>
            </div>
          </div>

          {/* Telefone */}
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Telefone</label>
            <div className="relative">
              <MdPhone className="absolute left-3 top-6 -translate-y-1/2 text-gray-400" />
              <input {...register("phone")} readOnly={!!tel} type="text" placeholder="(00) 00000-0000" className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]" />
              <div className="h-2 mt-1">{errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}</div>
            </div>
          </div>
          <button type="submit" disabled={!isValid} className={`bg-primary-50 cursor-pointer text-white font-medium px-8 py-3 rounded-md transition duration-200 shadow-sm ${!isValid && "opacity-50"}`}>
            Continuar
          </button>
        </form>
      </div>
    </section>
  );
}
