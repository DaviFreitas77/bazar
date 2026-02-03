import FuzzyText from "@/components/styles/fuzzyText";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <FuzzyText color="#A2785A" fontSize="20rem" baseIntensity={0.2} hoverIntensity={0.5} enableHover>
        404
      </FuzzyText>
      <p className="mt-10 font-semibold text-gray-800 ">Ops! Página não encontrada.</p>
      <p className="mt-1 text-gray-500">Parece que o link que você seguiu está quebrado ou a página foi movida.</p>

      <Link className="bg-primary-50 mt-20 text-white px-20 py-3 rounded-sm  uppercase tracking-wider" to={"/"}>Voltar as compras</Link>
      
    </div>
  );
}
