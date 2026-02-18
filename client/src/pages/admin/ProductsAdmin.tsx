import { HeaderAdmin } from "@/components/admin/layout/header";
import { TableProduct } from "@/components/admin/product/tableProducts";
import LayoutSidebar from "@/components/admin/sidebar";

export function ProductsAdmin() {
  return (
    <main className="px-4 bg-primary-300 ">
      <LayoutSidebar>
          <HeaderAdmin/>
          <TableProduct/>
      </LayoutSidebar>
    </main>
  );
}
