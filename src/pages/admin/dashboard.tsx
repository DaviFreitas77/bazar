import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { TableProduct } from "@/components/admin/product/tableProducts";
import LayoutSidebar from "@/components/admin/sidebar";

export function Dashboard() {
  return (
    <main className="bg-gray-50">
      <LayoutSidebar>
          <HeaderAdmin/>
          <TableProduct/>
      </LayoutSidebar>
    </main>
  );
}
