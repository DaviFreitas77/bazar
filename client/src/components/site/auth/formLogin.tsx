import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/schemaAuth";
import { loginUser } from "@/api/site/auth.api";
import { useEffect, useState } from "react";
import { Loading } from "../loading/loading";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUI } from "@/context/UIContext";
import type { FormLoginProps, login } from "@/@types/auth/login";

export function FormLogin({ onChangeForm, onClose }: FormLoginProps) {
  const { setModalAuth } = useUI();
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorGoogle, setErrorGoogle] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setName, setEmail, setLastName, setTel, setRole, setNewsLetter } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: login) => {
    setLoading(true);
    setErrorGoogle(false);
    setErrorMessage("");
    try {
      const response = await loginUser(data);
      setEmail(response.user.email);
      setName(response.user.name);
      setLastName(response.user.lastName);
      setTel(response.user.tel);
      setRole(response.user.role);
      setNewsLetter(response.user.receive_newsletter);
      localStorage.setItem("token", response.token);

      if (response.user.role === "admin") {
        navigate("/admin-dashboard");
      } 
      
      onClose();
      toast.success("Login realizado");
    } catch (error: any) {
      if (error.status === 401) {
        setErrorMessage("Credenciais inválidas");
      }
      if (error.status === 403) {
        setErrorMessage("conta vinculada com outro provedor");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const authGoogle = () => {
  //   setErrorGoogle(false);
  //   setErrorMessage("");
  //   window.location.href = "https://web-production-edc6.up.railway.app/auth/google/redirect";
  // };

  const [params] = useSearchParams();

  useEffect(() => {
    const openModal = params.get("loginModal");
    if (openModal === "true") {
      setModalAuth(true);
      setErrorGoogle(true);
    }
  }, []);

  return (
    <main className="w-full ">
      <div className="flex flex-col mb-2">
        <h2 className="mt-4 text-xl font-bold">Entrar</h2>
        <p className="text-sm text-gray-600 mt-2 mb-10">Faça login com seus dados para acessar sua conta.</p>

        {/* <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button onClick={authGoogle} className="bg-white border border-gray-200 w-full flex items-center justify-center gap-2 px-4 py-3  rounded-sm  transition font-medium mt-4 cursor-pointer">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <g>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </g>
            </svg>
            <p className=" text-sm">Entrar com Google</p>
          </button>
        </div> */}

        {/* <div className="flex items-center my-4">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink mx-4 text-gray-400 text-sm">ou</span>
          <div className="grow border-t border-gray-200"></div>
        </div> */}
      </div>

      <form onSubmit={handleSubmit(login)} className="w-full text-sm" method="POST">
        <div className="flex flex-col gap-4 mb-2">
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} name="email" type="email" className="px-3 py-4 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" placeholder="seu@email.com" />
            <div className="h-2 my-1">{errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}</div>
          </div>
          <div className="w-full relative">
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <input {...register("password")} placeholder="********" type={visiblePassword ? "text" : "password"} className="px-3 py-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary-50 transition-all duration-300 outline-0 w-full mt-2" />

            <span className="absolute top-11 right-6">
              <button type="button" onClick={() => setVisiblePassword(!visiblePassword)} className="cursor-pointer hover:opacity-85">
                {visiblePassword ? <IoEyeOutline size={17} /> : <FaRegEyeSlash size={17} />}
              </button>
            </span>
            <div className="h-2 mt-1 mb-4">
              {errors.password ? <span className="text-red-500 text-xs">{errors.password.message}</span> : <span className="text-red-500 text-xs">{errorMessage}</span>} {errorGoogle && <span className="text-red-500 text-xs">Conta não vinculada ao google</span>}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" name="remember" className="mr-2" /> Lembrar-me
          </label>
          <a id="show-form-password" className="text-sm hover:underline text-primary-50 cursor-pointer  font-medium">
            Esqueceu a senha?
          </a>
        </div>
        <div className="flex w-full">
          <button type="submit" className="bg-primary-50 transition-colors text-white px-6 py-3 rounded-sm font-semibold w-full hover:bg-primary-100 cursor-pointer">
            {loading ? <Loading /> : "Entrar"}
          </button>
        </div>
        <p className="mt-4 text-center text-sm">
          Não tem conta?
          <button onClick={onChangeForm} type="button" className=" ml-1 text-primary-50 cursor-pointer  font-medium">
            Registrar
          </button>
        </p>
      </form>
    </main>
  );
}
