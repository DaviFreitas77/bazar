import { FinancialCard } from "@/components/admin/dashboard/financialCard";
import { LastCategoriesSixMonth } from "@/components/admin/dashboard/lastCategoriesSixMonth";
import { LastLeads } from "@/components/admin/dashboard/lastLeads";
import { LastOrder } from "@/components/admin/dashboard/lastOders";
import { LastOrdersSixMonth } from "@/components/admin/dashboard/LastOrdersSixMonth";

import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/layout/metrics";
import LayoutSidebar from "@/components/admin/sidebar";
import { useDashboardMetrics } from "@/hooks/admin/useDashboardMetrics";


export function Dashboard() {
 const { metricsData } = useDashboardMetrics(); 


  return (
    <main className="bg-gray-50 px-4">
      <LayoutSidebar>
        <HeaderAdmin />
        <Metrics items={metricsData} />

        <div className="flex w-full gap-4">
          <LastOrdersSixMonth />
          <LastCategoriesSixMonth />
        </div>

        <div className="flex my-4 gap-4">
          <LastOrder />
          <LastLeads />
          <FinancialCard />
        </div>
      </LayoutSidebar>
    </main>
  );
}
