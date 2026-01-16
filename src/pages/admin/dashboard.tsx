import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { ActionProduct } from "@/components/admin/product/actionsProduct";
import { MetricsProduct } from "@/components/admin/product/metricsProduct";
import { TableProduct } from "@/components/admin/product/tableProducts";
import LayoutSidebar from "@/components/admin/sidebar";

export function Dashboard() {
  return (
    <LayoutSidebar>
      <div className="w-full">
        <HeaderAdmin/>
        <ActionProduct/>
        <MetricsProduct/>
        <TableProduct/>

      </div>
    </LayoutSidebar>
  );
}
