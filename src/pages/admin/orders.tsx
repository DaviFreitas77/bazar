import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import { Metrics } from "@/components/admin/layout/metrics";
import { Graphic, type ChartConfig } from "@/components/ui/chart";
import { TableOrders } from "@/components/admin/ordersAdmin/tableOrders";

import LayoutSidebar from "@/components/admin/sidebar";

import { useMetricOrders } from "@/hooks/admin/useMetrics";
import { Loading } from "@/components/site/loading/loading";


//   {
//     title: "Total de Pedidos",
//     value: 120,
//     footer: "+10% vs mês anterior",
//     footerColor: "text-green-600",
//   },
//   {
//     title: "Total de vendas",
//     value: "R$ 5.200",
//     footer: "+10% vs mês anterior",
//     footerColor: "text-green-600",
//   },
//   {
//     title: "Vendas fora do site",
//     value: "R$ 3.250",
//     footer: "+6% vs mês anterior",
//     footerColor: "text-green-600",
//   },
//   {
//     title: "Categoria mais vendida",
//     value: "Acessórios",
//     footer: "neste mês",
//   },
// ];
export function OrdersAdmin() {
  const { data: metricOrders } = useMetricOrders();




  const metricsData = [
    {
      title: "Total de Pedidos",
      value: metricOrders?.totalOrders ?? <div className="py-5"> <Loading/></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos completos",
      value: metricOrders?.ordersCompleted ?? <div className="py-5"> <Loading/></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos em preparo",
      value: metricOrders?.ordersPreparando ?? <div className="py-5"> <Loading/></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
    {
      title: "Pedidos cancelados",
      value: metricOrders?.ordersCanceled ?? <div className="py-5"> <Loading/></div>,
      footer: "+10% vs mês anterior",
      footerColor: "text-green-600",
    },
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

  const chartData = [
    { method: "CARTÃO", payment: metricOrders?.creditCard ?? 0, fill: "#830AD2" },
    { method: "PIX", payment: metricOrders?.pix ?? 0, fill: "#3D9386" },
    { method: "BOLETO", payment: metricOrders?.boleto ?? 0, fill: "#EF7296" },
  ];

  return (
    <main className="bg-gray-50 px-4">
      <LayoutSidebar>
        <HeaderAdmin />
        <Metrics items={metricsData} />
        <section className="flex w-full gap-2 bg-white p-5 rounded-md border border-gray-200 ">
          <Graphic title="Métodos de pagamento" config={chartConfig} data={chartData} dataKey="payment" />

          <Graphic title="Métodos de pagamento" config={chartConfig} data={chartData} dataKey="payment" />
        </section>
        <TableOrders/>
      </LayoutSidebar>
    </main>
  );
}
