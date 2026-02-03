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


interface FormRegisterProps {
  onChangeForm: () => void;
  onClose: () => void;
}

export function FormRegister({ onChangeForm, onClose }: FormRegisterProps) {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setName, setEmail, setLastName, setTel } = useUser();

  const {
    register,
    handleSubmit,
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
      localStorage.setItem('token',response.token);
      
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

  return (
    <main >
      <div className="flex flex-col mb-2 ">
        <h2 className="mt-4 text-xl font-bold">Crie sua conta</h2>
        <p className="text-sm text-gray-600 mt-2">Preencha os campos abaixo para começar a usar a plataforma.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 text-sm">
          <button className="bg-white border border-gray-200 w-full flex items-center justify-center gap-2 px-4 p-3  rounded-sm-sm hover:bg-gray-100 transition font-medium mt-4 text-sm">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <g>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
            Entrar com Google
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 text-gray-400 text-sm">ou</span>
          <div className="grow border-t border-gray-200"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="w-full text-sm " method="POST">
        <div className="flex flex-col gap-4 mb-2 ">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input {...register("name")} name="name" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="ex: Davi" />
            <div className="h-2 mt-1">{errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}</div>
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Sobrenome</label>
            <input {...register("lastName")} name="lastName" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="ex: Freitas" />
            <div className="h-2 mt-1">{errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}</div>
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} name="email" type="email" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="seu@email.com" />
            <div className="h-2 mt-1">{errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}</div>
          </div>
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Numero</label>
            <input {...register("tel")} name="tel" type="text" className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="(99) 99 999999-9999" />
            <div className="h-2 mt-1">{errors.tel && <span className="text-red-500 text-xs">{errors.tel.message}</span>}</div>
          </div>
          <div className="w-full relative">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input {...register("password")} name="password" type={visiblePassword ? "text" : "password"} className="px-3 p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="Senha" />

            <span className="absolute top-10.5 right-6">
              <button type="button" onClick={() => setVisiblePassword(!visiblePassword)} className="cursor-pointer hover:opacity-85">
                {visiblePassword ? <FaRegEyeSlash size={17} /> : <IoEyeOutline size={17} /> }
              </button>
            </span>

            <div className="h-2 mt-1">{errors.password ? <span className="text-red-500 text-xs">{errors.password.message}</span> : <span className="text-red-500 text-xs">{errorMessage}</span>}</div>
          </div>
        </div>
        <div className="flex w-full">
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