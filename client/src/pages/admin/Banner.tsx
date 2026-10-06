import { HeaderAdmin } from "@/components/admin/layout/header";
import LayoutSidebar from "@/components/admin/sidebar";
import { api } from "@/lib/api";
import { useState } from "react";
import {
 ChevronDown,
 ChevronUp,
 Edit3,
 ImagePlus,
 Monitor,
 MoreVertical,
 Smartphone,
 Trash2,
 Upload,
 X,
} from "lucide-react";

export function Banner() {
 const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});

 const banners = [
  {
   title: "Nova colecao de inverno",
   image: "/images/bannerHome4.webp",
   link: "/colecao/inverno",
   active: true,
  },
  {
   title: "Conforto para todos os dias",
   image: "/images/bannerConfort.png",
   link: "/produtos",
   active: false,
  },
 ];

 const saveBanner = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  try {
   const response = await api.post("/banner/create", formData);

   const data = response.data;
   console.log("Banner criado com sucesso:", data);
  } catch (error) {
   console.error("Erro ao criar o banner:", error);
  }
 };

 const handleImageChange = (id: string, file?: File) => {
  if (!file) return;

  setImagePreviews((current) => ({
   ...current,
   [id]: URL.createObjectURL(file),
  }));
 };

 return (
  <main className="flex min-h-screen w-full justify-center bg-[#f8faf9] px-3 sm:px-6">
   <LayoutSidebar>
    <section className="min-h-screen pb-20">
     <HeaderAdmin />

     <div className=" mt-8 w-full max-w-[1500px] space-y-7">
      <div className="flex items-end justify-end w-full">
       <button
        type="button"
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-primary-50 px-5 text-sm font-semibold text-white transition hover:bg-[#083f3f]"
       >
        <ImagePlus size={18} /> Novo banner
       </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
       <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-4">
         <div>
          <h2 className="font-bold text-gray-800">Banners publicados</h2>
          <p className="mt-1 text-xs text-gray-400">A ordem define a prioridade na home.</p>
         </div>
         <span className="rounded-full bg-primary-300 px-3 py-1 text-xs font-semibold text-primary-50">1 ativo</span>
        </div>

        <div className="space-y-3">
         {banners.map((banner) => (
          <article
           key={banner.title}
           className="group flex flex-col gap-4 rounded-lg border border-gray-200 p-3 transition hover:border-gray-300 sm:flex-row sm:items-center"
          >
           <img src={banner.image} alt={banner.title} className="h-28 w-full rounded-md object-cover sm:h-20 sm:w-36" />
           <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
             <h3 className="truncate text-sm font-bold text-gray-800">{banner.title}</h3>
             <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${banner.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"}`}
             >
              {banner.active ? "Ativo" : "Inativo"}
             </span>
            </div>
            <p className="mt-1 truncate text-xs text-gray-400">{banner.link || "Sem link definido"}</p>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-400">
             <Monitor size={13} /> Desktop <span className="mx-1">·</span>
             <Smartphone size={13} /> Mobile
            </div>
           </div>
           <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:border-0 sm:pt-0">
            <div className="flex items-center gap-1">
             <button
              type="button"
              title="Mover para cima"
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30"
             >
              <ChevronUp size={16} />
             </button>
             <button
              type="button"
              title="Mover para baixo"
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30"
             >
              <ChevronDown size={16} />
             </button>
            </div>
            <div className="flex items-center gap-1">
             <button
              type="button"
              title={banner.active ? "Desativar banner" : "Ativar banner"}
              className={`relative h-6 w-10 rounded-full transition ${banner.active ? "bg-primary-50" : "bg-gray-200"}`}
             >
              <span
               className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${banner.active ? "left-5" : "left-1"}`}
              />
             </button>
             <button type="button" title="Editar banner" className="rounded p-2 text-gray-500 hover:bg-gray-100">
              <Edit3 size={16} />
             </button>
             <button
              type="button"
              title="Excluir banner"
              className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
             >
              <Trash2 size={16} />
             </button>
             <button
              type="button"
              title="Mais opcoes"
              className="hidden rounded p-2 text-gray-400 hover:bg-gray-100 sm:block"
             >
              <MoreVertical size={16} />
             </button>
            </div>
           </div>
          </article>
         ))}
        </div>
       </section>

       <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-start justify-between border-b border-gray-100 pb-4">
         <div>
          <h2 className="font-bold text-gray-800">Novo banner</h2>
          <p className="mt-1 text-xs text-gray-400">Uma imagem para cada dispositivo.</p>
         </div>
         <button type="button" title="Limpar formulario" className="rounded-md p-1 text-gray-400 hover:bg-gray-100">
          <X size={18} />
         </button>
        </div>

        <form className="space-y-5" onSubmit={saveBanner}>
         <div className="space-y-2">
          <label htmlFor="banner-title" className="text-sm font-semibold text-gray-700">
           Nome do banner
          </label>
          <input
           id="banner-title"
           name="name"
           placeholder="Ex: Semana de ofertas"
           className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50/30 px-3 text-sm outline-none transition focus:border-primary-50 focus:ring-2 focus:ring-primary-50/10"
          />
         </div>
         <div className="space-y-2">
          <label htmlFor="banner-link" className="text-sm font-semibold text-gray-700">
           Link de destino <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <input
           id="banner-link"
           name="link"
           placeholder="/colecao/ofertas"
           className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50/30 px-3 text-sm outline-none transition focus:border-primary-50 focus:ring-2 focus:ring-primary-50/10"
          />
         </div>
         {[
          { id: "banner-desktop-image", label: "Imagem desktop" },
          { id: "banner-mobile-image", label: "Imagem mobile" },
         ].map(({ id, label }) => (
          <div key={id} className="space-y-2">
           <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-sm font-semibold text-gray-700">
             {label}
            </label>
            <span className="text-[11px] uppercase tracking-wider text-gray-400">JPG, PNG ou WEBP</span>
           </div>
           <label
            htmlFor={id}
            className="group relative flex aspect-16/7 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 transition hover:border-primary-50 hover:bg-primary-50/5"
           >
            <input
             id={id}
             name={id === "banner-desktop-image" ? "image" : "mobile_image"}
             type="file"
             accept="image/jpeg,image/png,image/webp"
             className="sr-only"
             onChange={(event) => handleImageChange(id, event.target.files?.[0])}
            />
            {imagePreviews[id] ? (
             <img src={imagePreviews[id]} alt={`Previa de ${label}`} className="h-full w-full object-cover" />
            ) : (
             <>
              <Upload size={22} className="text-gray-400 transition group-hover:text-primary-50" />
              <span className="mt-2 text-sm font-semibold text-gray-600 group-hover:text-primary-50">Enviar imagem</span>
              <span className="mt-1 text-xs text-gray-400">Clique para selecionar um arquivo</span>
             </>
            )}
           </label>
          </div>
         ))}
         <input type="hidden" name="status" value="1" />
         <button
          type="submit"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary-50 text-sm font-semibold text-white transition hover:bg-[#083f3f]"
         >
          <ImagePlus size={17} /> Adicionar banner
         </button>
        </form>
       </section>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
       <div className="flex flex-col gap-4 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
         <h2 className="font-bold text-gray-800">Pre-visualizacao</h2>
         <p className="mt-1 text-xs text-gray-400">Confira como o banner aparece na home.</p>
        </div>
        <div className="flex rounded-md bg-gray-100 p-1">
         <button
          type="button"
          className="flex items-center gap-2 rounded bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm"
         >
          <Monitor size={14} /> Desktop
         </button>
         <button
          type="button"
          className="flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold text-gray-500"
         >
          <Smartphone size={14} /> Mobile
         </button>
        </div>
       </div>
       <div className="flex min-h-48 items-center justify-center bg-[#edf2f0] p-4 sm:min-h-64 sm:p-8">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-md bg-white shadow-lg">
         <img src="/images/bannerHome4.webp" alt="Previa do banner" className="aspect-16/6 w-full object-cover" />
         <div className="absolute bottom-2 left-2 rounded bg-black/55 px-2 py-1 text-[10px] font-medium text-white">
          Banner ativo na home
         </div>
        </div>
       </div>
      </section>
     </div>
    </section>
   </LayoutSidebar>
  </main>
 );
}
