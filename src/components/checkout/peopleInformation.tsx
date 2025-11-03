import { CiUser } from "react-icons/ci";
import { MdEmail, MdPhone } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";

export function PeopleInformation() {
  return (
    <section className="lg:col-span-2">
    
      {/* Formulário */}
      <div className="px-2 py-6 md:p-8 rounded-md">
        {/* Título */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="bg-[#F4EDE7] p-2 rounded-full text-primary-50">
            <CiUser size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">
              Informações Pessoais
            </p>
            <p className="text-sm text-gray-400">
              Preencha seus dados para continuar.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-8 space-y-5">
          {/* Nome e Sobrenome */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">Nome</label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <label className="text-gray-900 font-medium text-sm">
                Sobrenome
              </label>
              <div className="relative">
                <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Seu sobrenome"
                  className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">Email</label>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="seuemail@gmail.com"
                className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="flex flex-col w-full gap-1">
            <label className="text-gray-900 font-medium text-sm">
              Telefone
            </label>
            <div className="relative">
              <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="(00) 00000-0000"
                className="border border-gray-200 py-3 pl-10 pr-4 w-full rounded-md outline-none focus:ring-2 focus:ring-[#D0AB91]/50 transition duration-200 bg-[#F9FAFB]"
              />
            </div>
          </div>
        </div>

    
      </div>
    </section>
  );
}
