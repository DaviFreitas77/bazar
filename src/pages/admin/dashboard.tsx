import { FinancialCard } from "@/components/admin/dashboard/financialCard";
import { LastCategoriesSixMonth } from "@/components/admin/dashboard/lastCategoriesSixMonth";
import { LastLeads } from "@/components/admin/dashboard/lastLeads";
import { LastOrder } from "@/components/admin/dashboard/lastOders";
import { LastOrdersSixMonth } from "@/components/admin/dashboard/LastOrdersSixMonth";

import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/layout/metrics";
import LayoutSidebar from "@/components/admin/sidebar";


const metricsData = [
  {
    title: "Total de Pedidos",
    value: 120,
    footer: "+10% vs mês anterior",
    footerColor: "text-green-600",
  },
  {
    title: "Total de vendas",
    value: "R$ 5.200",
    footer: "+10% vs mês anterior",
    footerColor: "text-green-600",
  },
  {
    title: "Vendas fora do site",
    value: "R$ 3.250",
    footer: "+6% vs mês anterior",
    footerColor: "text-green-600",
  },
  {
    title: "Categoria mais vendida",
    value: "Acessórios",
    footer: "neste mês",
  },
];

<Metrics items={metricsData} />

export function Dashboard() {
  return (
    <main className="bg-gray-50 px-4">
      <LayoutSidebar>
        <HeaderAdmin />
        <Metrics  items={metricsData}/>

        <div className="flex w-full">
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
