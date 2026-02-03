import { apiRegisterNewsLetter } from "@/api/site/user.api";

import ShinyText from "@/components/styles/shineText";
import { useUser } from "@/context/userContext";
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
    } catch (error: any) {
      if (error.response.status == 422) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <section className="flex items-center justify-around px-5 bg-gray-50">
      <div className="flex  lg:justify-between w-full max-w-[1440px] gap-2 my-10 flex-col lg:flex-row justify-center ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-gray-800 font-semibold text-3xl lg:text-4xl max-w-xl ">
            Inscreva-se e aproveite <span className="text-primary-50 ">cupons</span>, <span className="text-primary-50 ">promoções</span> e <span className="text-primary-50 ">descontos.</span>
          </h1>
          <div className="flex flex-col w-full md:w-145 md:flex-row gap-1 relative mt-10">
            <div>
              <input disabled={newsLetter} className={`border border-primary-50 text-gray-500 bg-white pl-10  py-3 w-full md:w-100 outline-none  rounded-sm" type="text`} placeholder="seumelhor@email.com" onChange={(e) => setEmailNewsLetter(e.target.value)} defaultValue={email ?? ""} />
              <p className="text-red-500 my-1">{message && message}</p>
            </div>

            <span className="absolute top-3 left-3">{newsLetter ? <IoMdCheckmark className="text-green-700" size={23} /> : <AiOutlineMail className="text-gray-400" size={23} />}</span>

            <button disabled={newsLetter} onClick={registerNewsLetter} className={`h-13 w-full md:w-100  rounded-sm cursor-pointer   bg-primary-50 text-white text-sm font-semibold  ${newsLetter ? "opacity-65" : "opacity-100"}`}>
              {newsLetter ? "Desconto adquirido!" : "Quero meu desconto"}
            </button>
          </div>
        </div>

        <section className="w-full lg:max-w-sm flex justify-center items-center lg:justify-end mt-5 lg:mt-0">
          <div className="flex flex-col gap-4 w-full max-w-2xl md:max-w-xl  lg:w-full ">
            <p className="text-3xl hidden lg:block">
              <ShinyText text="Beneficios" speed={2} delay={0} color="#000" shineColor="#ffffff" spread={120} direction="left" yoyo={false} pauseOnHover={false} disabled={false} />
            </p>
            <div className="flex items-center gap-1">
              <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
              <p className="text-base  text-gray-600">Receba cupons exclusivos.</p>
            </div>
            <div className="flex items-center gap-1">
              <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
              <p className="text-base  text-gray-600">Saiba de produtos novos em primeira mão.</p>
            </div>
            <div className="flex items-center gap-1">
              <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
              <p className="text-base  text-gray-600">Compre antes de todo mundo.</p>
            </div>
            <div className="flex items-center gap-1">
              <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
              <p className="text-base  text-gray-600">Compre antes de todo mundo.</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
