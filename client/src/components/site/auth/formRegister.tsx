import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/schemaAuth";
import { registerUser } from "@/api/site/auth.api";
import { useState } from "react";
import { Loading } from "../loading/loading";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import type { Register } from "@/@types/auth/register";
import { ProgressStep } from "../checkout/progress";
import { IoArrowBack } from "react-icons/io5";

interface FormRegisterProps {
  onChangeForm: () => void;
  onClose: () => void;
}

export function FormRegister({ onChangeForm, onClose }: FormRegisterProps) {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setName, setEmail, setLastName, setTel, setRole } = useUser();
  const [stepRegister, setStepRegister] = useState<number>(1);

  const registerSteps = [
    { id: 1, label: "Dados pessoais" },
    { id: 2, label: "Senha de acesso" },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<Register>({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister = async (data: Register) => {
    setErrorMessage("");
    setLoading(true);
    try {
      const response = await registerUser(data);

      onClose();
      toast.success("Cadastro realizado!");
      setEmail(response.user.email);
      setName(response.user.name);
      setLastName(response.user.lastName);
      setTel(response.user.tel);
      setRole(response.user.role);
      localStorage.setItem("token", response.token);
      reset(); 
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro inesperado ao criar a conta.");
      }
    } finally {
      setLoading(false);
    }
  };

  const avancedStep = async () => {
    if (stepRegister === 1) {
      const valid = await trigger(["name", "lastName", "email"]);

      if (!valid) return;
    }
    if (stepRegister === 2) {
      const valid = await trigger(["tel", "password", "terms"]);

      if (!valid) return;
    }

    setStepRegister((prev) => prev + 1);
  };

  const returnStep = () => {
    setStepRegister((prev) => prev - 1);
  };

  return (
    <main className="w-full">
      {stepRegister > 1 && (
        <button type="button" onClick={returnStep} className=" rounded-full hover:bg-gray-100 transition absolute left-2 top-2">
          <IoArrowBack size={20} />
        </button>
      )}
      <div className="flex flex-col mb-2 ">
        <h2 className="mt-4 text-xl font-bold">Crie sua conta</h2>
        <p className="text-sm text-gray-600 mt-2 mb-10">Preencha os campos abaixo para começar a usar a plataforma.</p>
      </div>

      <div className="flex items-center justify-center w-full mb-10">
        <ProgressStep step={stepRegister} steps={registerSteps} />
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="w-full text-sm " method="POST">
        <div className="flex flex-col gap-4 mb-2 w-full ">
          {stepRegister == 1 ? (
            <>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <div>{errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}</div>
                </div>
                <input {...register("name")} name="name" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="ex: Davi" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Sobrenome</label>
                  <div>{errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}</div>
                </div>
                <input {...register("lastName")} name="lastName" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="ex: Freitas" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div>{errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}</div>
                </div>

                <input {...register("email")} name="email" type="email" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="seu@email.com" />
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Numero</label>
                  <div>{errors.tel && <span className="text-red-500 text-xs">{errors.tel.message}</span>}</div>
                </div>
                <input {...register("tel")} name="tel" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="(00) 00000-0000" />
              </div>
              <div className="w-full relative">
                <label className="text-sm font-medium text-gray-700">Senha</label>

                <input {...register("password")} name="password" type={visiblePassword ? "text" : "password"} className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="Senha" />

                <span className="absolute top-10.5 right-6">
                  <button type="button" onClick={() => setVisiblePassword(!visiblePassword)} className="cursor-pointer hover:opacity-85">
                    {visiblePassword ? <FaRegEyeSlash size={17} /> : <IoEyeOutline size={17} />}
                  </button>
                </span>
                <div className="mt-2">{errors.password ? <span className="text-red-500 text-xs">{errors.password.message}</span> : <span className="text-red-500 text-xs">{errorMessage}</span>}</div>
              </div>
              <div>
                <input type="checkbox" {...register("terms")} className="mr-2" />
                <label className="text-sm text-gray-600">
                  Li e concordo com os{" "}
                  <a href="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </a>
                </label>
                <div className="h-2 my-2">{errors.terms && <span className="text-red-500 text-xs">{errors.terms.message}</span>}</div>
              </div>
            </>
          )}
        </div>

        <div className={`flex w-full ${stepRegister == 2 && "hidden"}`}>
          <button type="button" onClick={avancedStep} className="bg-primary-50 transition-colors text-white px-6 p-3 rounded-sm-sm font-semibold w-full hover:bg-primary-100 cursor-pointer mt-4">
            {loading ? <Loading /> : "Próxima etapa"}
          </button>
        </div>

        <div className={`flex w-full ${stepRegister < 2 && "hidden"}`}>
          <button type="submit" className="bg-primary-50 transition-colors text-white px-6 p-3 rounded-sm-sm font-semibold w-full hover:bg-primary-100 cursor-pointer mt-4">
            {loading ? <Loading /> : "Registrar"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Já tem conta?
          <button onClick={onChangeForm} type="button" className="text-primary  cursor-pointer ml-1">
            Entrar
          </button>
        </p>
      </form>
    </main>
  );
}
