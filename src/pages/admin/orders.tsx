import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { TableOrders } from "@/components/admin/ordersAdmin/tableOrders";
import { MetricsProduct } from "@/components/admin/product/metricsProduct";
import LayoutSidebar from "@/components/admin/sidebar";


export function OrdersAdmin() {

  return (
    <LayoutSidebar>
      <HeaderAdmin/>
      <MetricsProduct/>
      <TableOrders />
    </LayoutSidebar>
  );
}
