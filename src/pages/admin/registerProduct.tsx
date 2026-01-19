import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import LayoutSidebar from "@/components/admin/sidebar";
import { useCategoriesAdmin } from "@/hooks/admin/useCategoryAdmin.";

export function RegisterProduct() {

  const {data:categories} = useCategoriesAdmin()

  console.log(categories)
  return (
    <LayoutSidebar>
      <section>
        <HeaderAdmin />
        <section className="flex justify-center mt-20">
          <form className="flex flex-col gap-10">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Nome do produto</label>
                <input type="text" placeholder="Ex: Camiseta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Descrição do produto</label>
                <input type="text" placeholder="Ex: Camiseta básica de manga curta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Categoria do produto</label>
                <input type="text" placeholder="Ex: Camiseta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Preço antigo</label>
                <input type="text" placeholder="Ex: R$ 100,00" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Novo preço</label>
                <input type="text" placeholder="Ex: R$ 69,99" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Estoque</label>
                <input type="text" placeholder="Ex: 1 " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Cores</label>
                <input type="text" placeholder="Ex: R$ 100,00" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Tamanhos</label>
                <input type="text" placeholder="Ex: R$ 69,99" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-800 text-base">Imagens</label>
                <input type="text" placeholder="Ex: 1 " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
            </div>

            <div>
              <button className="bg-primary-50 px-20 py-3 text-white rounded-sm cursor-pointer hover:opacity-85">Cadastrar Produto</button>
            </div>
          </form>
        </section>
      </section>
    </LayoutSidebar>
  );
}
