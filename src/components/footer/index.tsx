import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Logo</h2>
          <p className="text-sm">Sua loja online com os melhores produtos e preços.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Institucional</h3>
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
          <h3 className="text-white font-semibold mb-4">Categorias</h3>
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
          <h3 className="text-white font-semibold mb-4">Atendimento</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary-50">
                atendimento.bazar@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Receba novidades</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Seu melhor e-mail"
              className="bg-gray-800 text-white px-4 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary-50
               rounded-l-sm w-full"
            />

            <button
              className="bg-primary-50 text-white px-3 py-2 text-sm
               hover:bg-primary-60 transition
               rounded-r-sm flex items-center justify-center"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-8 text-sm">© {new Date().getFullYear()} Bazar. Todos os direitos reservados.</div>
    </footer>
  );
}
