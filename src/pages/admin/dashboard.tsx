import { FinancialCard } from "@/components/admin/dashboard/financialCard";

import { LastLeads } from "@/components/admin/dashboard/lastLeads";
import { LastOrder } from "@/components/admin/dashboard/lastOders";

import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/layout/metrics";
import LayoutSidebar from "@/components/admin/sidebar";
import { GraphicArea, type ChartConfig } from "@/components/ui/chart";
import { useDashboardMetrics } from "@/hooks/admin/useDashboardMetrics";

const chartDataArea = [
  { month: "Janeiro", Faturamento: 186 },
  { month: "Fevereiro", Faturamento: 305 },
  { month: "Março", Faturamento: 237 },
  { month: "Abril", Faturamento: 73 },
  { month: "Maio", Faturamento: 209 },
  { month: "Junho", Faturamento: 214 },
];

const chartConfigArea = {
  Faturamento: {
    label: "Faturamento",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Dashboard() {
  const { metricsData } = useDashboardMetrics();

  return (
    <main className="px-4">
      <LayoutSidebar>
        <HeaderAdmin />
        <Metrics items={metricsData} />

        <div className="w-full flex gap-4">
          <GraphicArea
            data={chartDataArea}
            config={chartConfigArea}
            dataKey="Faturamento"
            title="Acompanhe seu faturamento"
            titleColunm="month"
            description="Visualize a evolução das suas vendas.
"
          />
          <GraphicArea data={chartDataArea} config={chartConfigArea} dataKey="Faturamento" title="Acompanhe seu faturamento" titleColunm="month" />
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
