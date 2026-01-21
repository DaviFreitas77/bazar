import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/ordersAdmin/metrics";
import { TableOrders } from "@/components/admin/ordersAdmin/tableOrders";

import LayoutSidebar from "@/components/admin/sidebar";


export function OrdersAdmin() {

  return (
    <main className="bg-gray-50">
      <LayoutSidebar>
        <HeaderAdmin/>
        <Metrics/>
        <TableOrders />
      </LayoutSidebar>
    </main>
  );
}
