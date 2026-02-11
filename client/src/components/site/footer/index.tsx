import { useLocation, Link } from "react-router-dom";
import { NewsLetter } from "./newsLetter";
import { Mail, Phone } from "lucide-react";
import { useListCategories } from "@/hooks/site/useListCategories";
import { useProductsSearched } from "@/context/productsSearchedContext";

export function Footer() {
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();
  const { data: allCategories } = useListCategories();
  const { setNameProduct } = useProductsSearched();

  return (
    <footer className="mt-20 border-t border-gray-200 ">
      {pathname === "/" && (
        <div className="bg-white pb-20">
          <NewsLetter />
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bazar</h2>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-xs">Sua loja online com os melhores produtos, curadoria exclusiva e preços imbatíveis.</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-6">Institucional</h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li>
              <Link to="/sobre" className="hover:text-black transition-colors">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="hover:text-black transition-colors">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-black transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-black transition-colors">
                Dúvidas Frequentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-6">Categorias</h3>
          <div className="flex flex-col gap-4 text-sm">
            {allCategories?.map((category) => (
              <Link onClick={() => setNameProduct(category.name)} key={category.id} className="hover:text-primary-50 text-gray-700" to={`/pesquisa?category=${category.name}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs text-gray-500 mb-6">Atendimento</h3>
          <ul className="space-y-4 text-sm text-gray-600">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400" />
              <a href="mailto:atendimento.bazar@gmail.com" className="hover:underline">
                atendimento.bazar@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400" />
              <span>(11) 9999-9999</span>
            </li>
            <li className="pt-2">
              <p className="text-xs text-gray-400">Segunda a Sexta, das 09h às 18h</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Bazar. Todos os direitos reservados.</p>
          <div className="flex gap-4 opacity-70 grayscale">
            {/* Espaço para logos de pagamento (Visa, Master, Pix) */}
            <span className="text-[10px] font-bold border px-2 py-1 rounded">PIX</span>
            <span className="text-[10px] font-bold border px-2 py-1 rounded">VISA</span>
            <span className="text-[10px] font-bold border px-2 py-1 rounded">MASTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
