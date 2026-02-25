
import { HeaderAdmin } from "@/components/admin/layout/header";
import { FormRegisterProduct } from "@/components/admin/product/formRegisterProduct";
import LayoutSidebar from "@/components/admin/sidebar";


export function RegisterProduct() {

  return (
    <main className="bg-primary-300 px-4">
      <LayoutSidebar>
        <article className="min-h-screen pb-20">
          <HeaderAdmin />
          <section className="w-full mx-auto mt-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-700">Cadastrar Novo Produto</h1>
              <p className="text-gray-500 text-sm">Preencha as informações abaixo para adicionar um item à loja.</p>
            </div>

            <div>
              <FormRegisterProduct />
            </div>
          </section>
        </article>
      </LayoutSidebar>
    </main>
  );
}
