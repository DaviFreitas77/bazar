import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import LayoutSidebar from "@/components/admin/sidebar";
import { 
  Eye, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Search,
  MoreVertical
} from "lucide-react";

// Simulando dados que viriam do seu banco de dados
const emailHistory = [
  {
    id: 1,
    title: "Novidades da Plataforma - Versão 2.0",
    preview: "Olá a todos! Estamos muito felizes em anunciar as novas funcionalidades que acabam de chegar...",
    date: "17 Jan, 2024",
    status: "sent", // enviado
  },
  {
    id: 2,
    title: "Aviso de Manutenção Programada",
    preview: "Prezados usuários, realizaremos uma manutenção em nossos servidores na próxima madrugada...",
    date: "15 Jan, 2024",
    status: "sent",
  },
  {
    id: 3,
    title: "Oferta Exclusiva para Membros",
    preview: "Não perca essa oportunidade única de garantir seu plano anual com 50% de desconto...",
    date: "20 Jan, 2024",
    status: "scheduled", // agendado
  },
];

export function EmailAdmin() {
  return (
    <main className="px-4">
      <LayoutSidebar>
        <div className="flex flex-col min-h-screen ">
          <HeaderAdmin />
          <div className="flex-1 py-10 mx-auto w-full">
      
            {/* Cabeçalho da Página */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Histórico de Disparos</h1>
                <p className="text-gray-500 text-sm">Gerencie e visualize os e-mails enviados aos usuários.</p>
              </div>
      
              <button className="flex items-center gap-2 bg-primary-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors  shadow-blue-200">
                <Plus size={18} />
                Escrever Novo E-mail
              </button>
            </div>
            {/* Barra de Filtros e Pesquisa */}
            <div className="bg-white p-4 rounded-t-xl border border-b-0 border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
               <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar e-mails..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent"
                  />
               </div>
               <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                 Total: {emailHistory.length}
               </span>
            </div>
            {/* Lista de Emails */}
            <div className="bg-white border border-gray-200 rounded-b-xl  overflow-hidden">
              {emailHistory.map((email) => (
                <div
                  key={email.id}
                  className="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
      
                  {/* Conteúdo Esquerdo */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-gray-700 font-semibold truncate">
                        {email.title}
                      </h3>
      
                      {/* Badge de Status */}
                      {email.status === 'sent' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          <CheckCircle size={10} /> Enviado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                          <Clock size={10} /> Agendado
                        </span>
                      )}
                    </div>
      
                    <p className="text-sm text-gray-500 line-clamp-1 group-hover:text-gray-600 transition-colors">
                      {email.preview}
                    </p>
      
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {email.date}
                      </span>
                    </div>
                  </div>
                  {/* Ações Direita */}
                  <div className="flex items-center gap-2 self-end sm:self-center pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 w-full sm:w-auto justify-end">
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-transparent hover:border-blue-100"
                      title="Ver detalhes"
                    >
                      <Eye size={18} />
                      <span className="sm:hidden">Visualizar</span>
                    </button>
      
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 sm:block hidden">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutSidebar>
    </main>
  );
}