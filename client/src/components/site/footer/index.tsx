import { Link } from "react-router-dom";

import {  Phone } from "lucide-react";
import { useListCategories } from "@/hooks/site/useListCategories";
import { useProductsSearched } from "@/context/productsSearchedContext";

const paymentFlags = [
  {
    name: "Visa",
    svg: (
      <svg viewBox="0 0 64 40" role="img" aria-label="Visa" className="h-6 w-12">
        <rect width="64" height="40" rx="5" fill="#fff" />
        <path fill="#1434CB" d="M25.5 26.3h-4l2.5-15.1h4l-2.5 15.1Zm13.9-14.7a10 10 0 0 0-3.6-.6c-4 0-6.8 2-6.8 5 0 2.2 2 3.4 3.5 4.1 1.6.8 2.1 1.2 2.1 1.9 0 1-1.3 1.5-2.5 1.5-1.7 0-2.6-.2-4-.8l-.6-.3-.6 3.4c1 .4 2.9.8 4.8.8 4.3 0 7-2 7-5.2 0-1.7-1.1-3-3.4-4.1-1.4-.7-2.3-1.1-2.3-1.9 0-.6.7-1.3 2.3-1.3a7 7 0 0 1 3.1.6l.4.2.6-3.3Zm10.3-.3h-3.1c-1 0-1.7.3-2.1 1.2l-6 13.8h4.3l.8-2.2h5.2l.5 2.2h3.8l-3.4-15Zm-5 9.7 1.6-4.2.5-1.4.3 1.3.9 4.3h-3.3Zm-26.6-9.7-3.9 10.3-.4-2c-.7-2.3-3-4.9-5.5-6.2l3.6 12.9h4.3l6.3-15h-4.4Z" />
        <path fill="#F7B600" d="M10.7 11.3H4.3l-.1.3c5 1.2 8.3 4.1 9.6 7.7l-1.4-6.8c-.2-.9-.9-1.2-1.7-1.2Z" />
      </svg>
    ),
  },
  {
    name: "Mastercard",
    svg: (
      <svg viewBox="0 0 64 40" role="img" aria-label="Mastercard" className="h-6 w-12">
        <rect width="64" height="40" rx="5" fill="#fff" />
        <circle cx="26" cy="20" r="10" fill="#EB001B" />
        <circle cx="38" cy="20" r="10" fill="#F79E1B" />
        <path fill="#FF5F00" d="M32 12.1a10 10 0 0 1 0 15.8 10 10 0 0 1 0-15.8Z" />
      </svg>
    ),
  },
  {
    name: "Elo",
    svg: (
      <svg viewBox="0 0 64 40" role="img" aria-label="Elo" className="h-6 w-12">
        <rect width="64" height="40" rx="5" fill="#fff" />
        <path fill="#111827" d="M21.8 14.2c-4 0-7 2.5-7 6.2 0 3.6 3 6.1 7.2 6.1 2.4 0 4.3-.8 5.6-2.2l-2-2.1c-.9.9-2 1.4-3.5 1.4-1.9 0-3.2-.9-3.6-2.4h9.7c.1-.4.1-.8.1-1.2 0-3.4-2.7-5.8-6.5-5.8Zm-3.2 4.8c.4-1.3 1.5-2.1 3.1-2.1 1.6 0 2.7.8 3.1 2.1h-6.2Zm13-7.8h3.7v15h-3.7v-15Zm12.2 3c-3.8 0-6.8 2.7-6.8 6.2s3 6.1 6.8 6.1 6.8-2.6 6.8-6.1-3-6.2-6.8-6.2Zm0 9.1a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Z" />
        <circle cx="53" cy="13" r="3" fill="#FACC15" />
        <circle cx="56" cy="19" r="2.5" fill="#EF4444" />
        <circle cx="52" cy="25" r="2.8" fill="#22C55E" />
      </svg>
    ),
  },
  {
    name: "American Express",
    svg: (
      <svg viewBox="0 0 64 40" role="img" aria-label="American Express" className="h-6 w-12">
        <rect width="64" height="40" rx="5" fill="#2E77BC" />
        <path fill="#fff" d="M8 13h9l2 4.6 2-4.6h9v14h-5.6v-8.7L20.7 27h-3.4l-3.7-8.7V27H8V13Zm24 0h18v4h-12v1.3h11.6v3.4H38V23h12.3v4H32V13Zm20.2 0H56l-1.9 3.1-1.9-3.1h-3.9l3.8 5.8-4.2 6.2h4l2.2-3.5 2.2 3.5h4l-4.2-6.2L60 13h-4Z" />
      </svg>
    ),
  },
  {
    name: "Pix",
    svg: (
      <svg viewBox="0 0 64 40" role="img" aria-label="Pix" className="h-6 w-12">
        <rect width="64" height="40" rx="5" fill="#fff" />
        <path fill="#32BCAD" d="m32 7.5 8.9 8.9a5.1 5.1 0 0 1 7.2 0l5.3 5.3-4.2 4.2-5.3-5.3a1.8 1.8 0 0 0-2.6 0L32 29.9l-9.3-9.3a1.8 1.8 0 0 0-2.6 0l-5.3 5.3-4.2-4.2 5.3-5.3a5.1 5.1 0 0 1 7.2 0L32 7.5Z" />
        <path fill="#32BCAD" d="m16.3 28.7 3.8-3.8a1.8 1.8 0 0 1 2.6 0l6.7 6.7a3.7 3.7 0 0 0 5.2 0l6.7-6.7a1.8 1.8 0 0 1 2.6 0l3.8 3.8-8.9 8.9a9.6 9.6 0 0 1-13.6 0l-8.9-8.9Z" />
      </svg>
    ),
  },
];

export function Footer() {

  const currentYear = new Date().getFullYear();
  const { data: allCategories } = useListCategories();
  const { setNameProduct } = useProductsSearched();

  return (
    <footer className="mt-20 border-t border-gray-200  text-black">
     
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 ">
        <div className="flex flex-col gap-6">
          <div>
           <a href="/">
              <img src="/images/logo.png" alt="" className="w-20" />
            </a>

            <p className="mt-4  leading-relaxed max-w-xs">Bazar online e com os melhores produtos, curadoria exclusiva e preços imbatíveis.</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs  mb-6">Institucional</h3>
          <ul className="space-y-4 text-sm ">
            <li>
              <Link to="/sobre" className="hover:text-primary-50 transition-colors">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="hover:text-primary-50 transition-colors">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-primary-50 transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary-50 transition-colors">
                Dúvidas Frequentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs  mb-6">Categorias</h3>
          <div className="flex flex-col gap-4 text-sm">
            {allCategories?.map((category) => (
              <Link onClick={() => setNameProduct(category.name)} key={category.id} className="hover:text-primary-50 " to={`/pesquisa?category=${category.name}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-xs  mb-6">Atendimento</h3>
          <ul className="space-y-4 text-sm ">
            {/* <li className="flex items-center gap-3">
              <Mail size={16} className="" />
              <a href="mailto:atendimento.bazar@gmail.com" className="hover:underline">
                atendimento.bazar@gmail.com
              </a>
            </li> */}
            <li className="flex items-center gap-3">
              <Phone size={16} className="" />
              <span>(11) 99999-9999</span>
            </li>
            <li className="pt-2">
              <p className="text-xs ">Segunda a Sexta, das 09h às 18h</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 ">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm ">
          <p>© {currentYear} Bazar. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {paymentFlags.map((flag) => (
              <span key={flag.name} title={flag.name} className="inline-flex h-8 w-14 items-center justify-center rounded border border-gray-200 bg-white shadow-sm">
                {flag.svg}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
