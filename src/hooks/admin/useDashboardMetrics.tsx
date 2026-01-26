
import { useMetricsBilling } from "@/hooks/admin/useMetrics";

export function useDashboardMetrics() {
  const { data: metricsBilling, isLoading } = useMetricsBilling();


  console.log(metricsBilling)
  const metricsData = [
    {
      title: "Faturamento do dia",
      value: metricsBilling?.billingToday.value  ?? 0,
      footer: metricsBilling ? `+${metricsBilling.billingToday.variation}% vs dia anterior` : "",
      footerColor: "text-green-600",
      styleCard:'shadow-sm',
      prefix: "R$",
     

    },

    {
      title: "Faturamento Mensal",
      value: metricsBilling?.billingMonth.value ?? 0,
      footer: metricsBilling ? `+${metricsBilling.billingMonth.variation}% vs mês anterior` : "",
      footerColor: "text-green-600",
       styleCard:'shadow-sm',
        prefix: "R$"
    },

    {
      title: "Faturamento Trimestral",
      value: metricsBilling?.billingCurrentTrimester.value ?? 0,
      footer: metricsBilling ? `+${metricsBilling.billingCurrentTrimester.variation}% vs trimestre anterior` : "",
      footerColor: metricsBilling && metricsBilling.billingCurrentTrimester.variation < 0 ? "text-red-500" : "text-green-600",
       styleCard:'shadow-sm',
        prefix: "R$"
    },

    {
      title: "Faturamento total",
      value: metricsBilling?.billingTotal ?? 0,
      valueStyle: "text-green-600 text-3xl font-bold",
      styleCard:'shadow-sm',
       footer:"Receita acumulada",
      prefix: "R$"
    },
  ];

  return { metricsData, isLoading };
}
