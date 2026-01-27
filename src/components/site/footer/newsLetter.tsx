import { apiRegisterNewsLetter } from "@/api/site/user.api";
import CountUp from "@/components/styles/countUp";
import ShinyText from "@/components/styles/shineText";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

export function NewsLetter() {
  const { email, newsLetter } = useUser();
  const [emailNewsLetter, setEmailNewsLetter] = useState("");
  const [message, setMessage] = useState("");

  const registerNewsLetter = async () => {
    setMessage("");
    const data = {
      email: email ?? emailNewsLetter,
    };
    try {
      const response = await apiRegisterNewsLetter(data);
      console.log(response);
    } catch (error: any) {
      if (error.response.status == 422) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <section className="flex items-center justify-around px-10 bg-gray-50">
      <div className="flex  justify-between w-full max-w-[1440px] my-10 ">
        <div>
          <h1 className="text-gray-800 font-semibold text-4xl max-w-xl">
            Inscreva-se e aproveite <span className="text-primary-50 ">cupons</span>, <span className="text-primary-50 ">promoções</span> e <span className="text-primary-50 ">descontos.</span>
          </h1>
          <div className="flex gap-1 relative mt-10">
            <div>
              <input disabled={newsLetter} className={`border border-primary-50 text-gray-500 bg-white pl-10  py-3 w-100 outline-none  rounded-sm" type="text`} placeholder="seumelhor@email.com" onChange={(e) => setEmailNewsLetter(e.target.value)} defaultValue={email ?? ""} />
              <p className="text-red-500 my-1">{message && message}</p>
            </div>

            <span className="absolute top-3 left-3">{newsLetter ? <IoMdCheckmark className="text-green-700" size={23} /> : <AiOutlineMail className="text-gray-400" size={23} />}</span>

            <button disabled={newsLetter} onClick={registerNewsLetter} className={`h-13 px-5 rounded-sm cursor-pointer   bg-primary-50 text-white text-sm font-semibold  ${newsLetter ? "opacity-65" : "opacity-100"}`}>
              {newsLetter ? "Desconto adquirido!" : "Quero meu desconto"}
            </button>
          </div>
        </div>

        <div className=" flex flex-col gap-4">
         <p className="text-3xl  ">
            <ShinyText
              text="Beneficios"
              speed={2}
              delay={0}
              color="#000"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
             
          </p>
          <div className="flex items-center gap-1">
            <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
            <p className="text-base font-semibold text-gray-800">Receba cupons exclusivos.</p>
          </div>
          <div className="flex items-center gap-1">
            <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
            <p className="text-base font-semibold text-gray-800">Saiba de produtos novos em primeira mão.</p>
          </div>
          <div className="flex items-center gap-1">
            <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
            <p className="text-base font-semibold text-gray-800">Compre antes de todo mundo.</p>
          </div>
          <div className="flex items-center gap-1">
            <IoCheckmarkCircle size={22} color={newsLetter ? "green" : "gray"} />
            <p className="text-base font-semibold text-gray-800">Compre antes de todo mundo.</p>
          </div>
        </div>
        {/* <div className="flex gap-15 flex-col">
          <div className="flex items-center gap-15">
            <div className="space-y-2">
              <div>
                <p className="text-7xl text-gray-800 font-semibold mb-3">
                  <CountUp from={0} to={250} direction="up" duration={1} className="count-up-text" />+
                </p>
                <svg width={90} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 24" fill="#A2785A">
                  <g>
                    <path d="M6 7V6a6 6 0 1112 0v1h3l-1.5 14h-15L3 7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
                    <path transform="translate(24 0)" d="M6 7V6a6 6 0 1112 0v1h3l-1.5 14h-15L3 7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
                    <path transform="translate(48 0)" d="M6 7V6a6 6 0 1112 0v1h3l-1.5 14h-15L3 7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
                    <path transform="translate(72 0)" d="M6 7V6a6 6 0 1112 0v1h3l-1.5 14h-15L3 7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
                    <path transform="translate(96 0)" d="M6 7V6a6 6 0 1112 0v1h3l-1.5 14h-15L3 7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
                  </g>
                </svg>
              </div>
              <p className="text-gray-700 font-semibold text-sm">Compraram conosco!</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-7xl text-gray-800 font-semibold mb-3">
                  <CountUp from={0} to={4.7} direction="up" duration={1} className="count-up-text" />+
                </p>
                <svg width={100} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 24" fill="orange">
                  <g>
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                    <path transform="translate(24)" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                    <path transform="translate(48)" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                    <path transform="translate(72)" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                    <path transform="translate(96)" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2z" />
                  </g>
                </svg>
              </div>
              <p className="text-gray-700 font-semibold ">Avaliações</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
