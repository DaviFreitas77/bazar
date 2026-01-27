import { useLocation } from "react-router-dom";
import { NewsLetter } from "./newsLetter";

export function Footer() {
  const localPath = useLocation()
  return (
    <footer className="mt-20 flex flex-col gap-20">
      {localPath.pathname == "/" && <NewsLetter />}
      

      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-t-gray-200">
        <div>
          <h2 className="text-xl font-bold  mb-4">Logo</h2>
          <p className="text-sm">Sua loja online com os melhores produtos e preços.</p>
        </div>

        <div>
          <h3 className=" font-semibold mb-4">Institucional</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary-50">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-50">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-50">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className=" font-semibold mb-4">Categorias</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary-50">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-50">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary-50">
                Termos de Uso
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className=" font-semibold mb-4">Atendimento</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary-50">
                atendimento.bazar@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-3 text-sm">© {new Date().getFullYear()} Bazar. Todos os direitos reservados.</div>
    </footer>
  );
}
