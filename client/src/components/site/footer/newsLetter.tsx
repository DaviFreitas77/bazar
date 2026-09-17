import { apiRegisterNewsLetter } from "@/api/site/user.api";

import { useUser } from "@/context/userContext";
import axios from "axios";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

export function NewsLetter() {
  const { email, newsLetter,setNewsLetter } = useUser();
  const [emailNewsLetter, setEmailNewsLetter] = useState("");
  const [message, setMessage] = useState("");

  const registerNewsLetter = async () => {
    setMessage("");
    const data = {
      email: email ?? emailNewsLetter,
    };
    try {
       await apiRegisterNewsLetter(data);
      setNewsLetter(true)
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message?: string }>(error) && error.response?.status === 422) {
        setMessage(error.response.data.message ?? "Não foi possível cadastrar este e-mail.");
      }
    }
  };

  return (
    <section className="px-4 sm:px-6">
      <div className="relative mx-auto  my-10 max-w-[1440px] overflow-hidden rounded-2xl bg-[#f8f3ee]  lg:grid lg:grid-cols-[1.22fr_0.78fr]">
        <div className="relative overflow-hidden bg-primary-50 px-6 py-10 sm:px-10 lg:px-12 lg:[clip-path:ellipse(100%_160%_at_0_0)]">
          <Leaf className="absolute bottom-[2px] right-7 size-40 rotate-[-26deg] text-[#8cb2a9]/30" strokeWidth={1} />
          <div className="relative z-10 max-w-xl">
            <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e8c894]/70 text-[#e8c894] sm:mt-1">
                <AiOutlineMail size={20}  />
              </span>
              <h2 className="max-w-md font-serif text-2xl font-semibold leading-tight text-[#fff8ed] sm:text-3xl">
                Inscreva-se e aproveite <span className="text-[#e8c894]">cupons, promoções e descontos.</span>
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <input
                  disabled={newsLetter}
                  type="email"
                  className="h-12 w-full rounded-lg border border-white/50 bg-white px-4 pl-10 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-[#e8c894] focus:ring-2 focus:ring-[#e8c894]/30 disabled:cursor-not-allowed disabled:bg-stone-100"
                  placeholder="seumelhor@email.com"
                  onChange={(event) => setEmailNewsLetter(event.target.value)}
                  defaultValue={email ?? ""}
                />
                <span className="absolute left-3 top-3 text-stone-400">
                  {newsLetter ? <IoMdCheckmark className="text-emerald-700" size={20} /> : <AiOutlineMail size={19} />}
                </span>
                {message && <p className="absolute top-full mt-1 text-xs text-red-200">{message}</p>}
              </div>
              <button disabled={newsLetter} onClick={registerNewsLetter} className={`h-12 shrink-0 rounded-lg bg-[#a2785a] px-6 text-sm font-medium text-white transition hover:bg-[#8e674c] disabled:cursor-not-allowed ${newsLetter ? "opacity-65" : "cursor-pointer"}`}>
                {newsLetter ? "Desconto adquirido!" : "Quero meu desconto →"}
              </button>
            </div>
          </div>
        </div>

        <section className="px-6 py-8 sm:px-10 lg:px-12">
          <h2 className="font-serif text-2xl font-semibold text-[#0b5050]">Benefícios</h2>
          <ul className="mt-4 space-y-2.5">
            {["Receba cupons exclusivos.", "Saiba de produtos novos em primeira mão.", "Compre antes de todo mundo.", "Promoções especiais."].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-stone-600">
                <IoCheckmarkCircle size={17} className={newsLetter ? "text-emerald-600" : "text-[#0b5050]"} aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
