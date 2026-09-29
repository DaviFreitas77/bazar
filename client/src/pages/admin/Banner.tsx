import { HeaderAdmin } from "@/components/admin/layout/header";
import LayoutSidebar from "@/components/admin/sidebar";

export function Banner(){
    return(
        <div className="w-full h-full flex justify-center items-center px-4">
             <LayoutSidebar>
                   <article className="min-h-screen pb-20">
                           <HeaderAdmin />
                 
                           <section className="w-full mx-auto mt-10 flex flex-col gap-8">
                             <div>
                               <h1 className="text-2xl font-bold text-gray-700">Cadastrar novo banner</h1>
                               <p className="text-gray-500 text-sm">Gerencie os banners da loja.</p>
                             </div>
                 
                      
                           </section>
                         </article>
             </LayoutSidebar>
        </div>
    )
}