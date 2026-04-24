import { FormRegisterCupom } from "@/components/admin/cupom/formRegisterCupom";
import { TableCupoms } from "@/components/admin/cupom/tableCupoms";
import { HeaderAdmin } from "@/components/admin/layout/header";
import LayoutSidebar from "@/components/admin/sidebar";

export function RegisterCupom() {
  return (
    <main className="bg-primary-300 px-4">
      <LayoutSidebar>
        <article className="min-h-screen pb-20">
          <HeaderAdmin />

          <section className="w-full mx-auto mt-10 flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-700">Cadastrar Cupom</h1>
              <p className="text-gray-500 text-sm">Crie e gerencie cupons de desconto para a loja.</p>
            </div>

            <FormRegisterCupom />
            <TableCupoms />
          </section>
        </article>
      </LayoutSidebar>
    </main>
  );
}
