import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface AsideUserProps {
  namePage: string;
}

export function AsideUser({ namePage }: AsideUserProps) {
  return (
    <section className=" flex-col gap-8 max-w-[180px] w-full hidden lg:flex">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-gray-700 text-sm">Minha conta</h2>
        <div className="flex items-center justify-between hover:text-primary-400 cursor-pointer">
          <Link to="/pedidos" className={`text-sm ${namePage === "Meus pedidos" ? "text-primary-400" : "text-gray-700"}`}>
            Meus pedidos
          </Link>
          <FaChevronRight size={13} className="text-primary-400" />
        </div>
        <div className="flex items-center justify-between hover:text-primary-400 cursor-pointer">
          <p className="text-sm">Favoritos</p>
          <FaChevronRight size={13} className="text-primary-400" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-gray-700 text-sm">Informações pessoais</h2>
        <div className="flex items-center justify-between hover:text-primary-400 cursor-pointer">
          <Link to="/meus-enderecos" className={`text-sm ${namePage === "Meus endereços" ? "text-primary-400" : "text-gray-700"}`}>
            Meus endereços
          </Link>
          <FaChevronRight size={13} className="text-primary-400" />
        </div>
        
        <div className="flex items-center justify-between hover:text-primary-400 cursor-pointer">
          <Link to="/cartoes-salvos" className={`text-sm ${namePage === "Meus cartões" ? "text-primary-400" : "text-gray-700"}`}>
            Meus cartões
          </Link>
          <FaChevronRight size={13} className="text-primary-400" />
        </div>
      </div>
    </section>
  );
}
