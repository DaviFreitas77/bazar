import { useState } from "react";
import { FormLogin } from "./formLogin";
import { FormRegister } from "./formRegister";
import type { ModalAuthProps } from "./types/modalAuth";

type ChooseForm = "login" | "register";

export function ModalAuth({ open, onClose }: ModalAuthProps) {
  const [chooseForm, setChooseForm] = useState<ChooseForm>("login");

  return (
    <main className={`${open ? "block" : "hidden"} fixed inset-0 flex 
     justify-center items-center bg-black/50 z-999 px-2 `}>
      <section className="relative bg-white p-6 rounded-sm shadow-lg w-full max-w-xl   overflow-y-auto max-h-[500px] custom-scrollbar 2xl:max-h-[700px]">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition" onClick={onClose}>
          ✕
        </button>

        {chooseForm === "login" ? <FormLogin onChangeForm={() => setChooseForm("register")} onClose={onClose} /> : <FormRegister onChangeForm={() => setChooseForm("login")} onClose={onClose} />}
      </section>
    </main>
  );
}
