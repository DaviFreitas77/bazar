import { useState } from "react";
import { FormLogin } from "./formLogin";
import { FormRegister } from "./formRegister";
import type { ModalAuthProps } from "@/@types/auth/modalAuth";
import { FormForgotPassword } from "./formForgotPassword";

type ChooseForm = "login" | "register" | "forgotPassword";

export function ModalAuth({ open, onClose }: ModalAuthProps) {
  const [chooseForm, setChooseForm] = useState<ChooseForm>("login");


  return (
    <main
      className={`${open ? "block" : "hidden"} fixed inset-0 flex 
     justify-center items-center bg-black/50 z-50 px-2 `}
    >
      <section
        className="relative bg-white rounded-2xl  w-full max-w-5xl 
        flex "
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black transition text-xl ">
          ✕
        </button>
        <div className="w-full md:w-1/2 p-5 lg:p-8 flex items-center justify-center h-160 custom-scrollbar">
        
          {chooseForm === "login" && (
            <FormLogin onChangeForm={setChooseForm} onClose={onClose} />
          )}

          {chooseForm === "register" && (
            <FormRegister onChangeForm={setChooseForm} onClose={onClose} />
          )}

          {chooseForm === "forgotPassword" && (
            <FormForgotPassword onChangeForm={setChooseForm} onClose={onClose} />
          )}
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src="/images/login.jpg" alt="Moda feminina elegante" className="w-full h-full object-cover" />
        </div>
      </section>
    </main>
  );
}
