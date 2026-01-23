import { FinancialCard } from "@/components/admin/dashboard/financialCard";

import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/layout/metrics";
import { TableOrders } from "@/components/admin/ordersAdmin/tableOrders";
import LayoutSidebar from "@/components/admin/sidebar";
import { Loading } from "@/components/site/loading/loading";
import { Graphic, type ChartConfig } from "@/components/ui/chart";

import { useDashboardMetrics } from "@/hooks/admin/useDashboardMetrics";
import { useMetricOrders } from "@/hooks/admin/useMetrics";



export function Dashboard() {
  const { metricsData } = useDashboardMetrics();
  const { data: metricOrders } = useMetricOrders();




  const metricsDataOrders = [
    {
      title: "Total de Pedidos",
      value: metricOrders?.totalOrders ?? <div className="py-5"> <Loading /></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos completos",
      value: metricOrders?.ordersCompleted ?? <div className="py-5"> <Loading /></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos em preparo",
      value: metricOrders?.ordersPreparando ?? <div className="py-5"> <Loading /></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos cancelados",
      value: metricOrders?.ordersCanceled ?? <div className="py-5"> <Loading /></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
  ];



  const chartData = [
    { method: "CARTÃO", payment: metricOrders?.creditCard ?? 0, fill: "#830AD2" },
    { method: "PIX", payment: metricOrders?.pix ?? 0, fill: "#3D9386" },
    { method: "BOLETO", payment: metricOrders?.boleto ?? 0, fill: "#EF7296" },
  ];


  const chartConfig = {
    payment: {
      label: "Pagamentos",
    },
    CARTAO: {
      label: "CARTAO",
      color: "var(--chart-1)",
    },
    PIX: {
      label: "PIX",
      color: "var(--chart-2)",
    },
    BOLETO: {
      label: "BOLETO",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  return (
    <main className="px-4 bg-primary-300">
      <LayoutSidebar>
        <HeaderAdmin />
        <Metrics items={metricsData} />

        <section className="w-full flex  flex-col mt-10">
          <h2 className="text-xl text-gray-700 font-semibold">Pedidos</h2>
          <Metrics items={metricsDataOrders} />
        </section>

        <section className="mt-10">
          <TableOrders />
        </section>

        <div className="flex  gap-4 mt-10">
            <Graphic title="Métodos de pagamento" config={chartConfig} data={chartData} dataKey="payment" />
          <FinancialCard />
        </div>
      </LayoutSidebar>
    </main>
  );
}
