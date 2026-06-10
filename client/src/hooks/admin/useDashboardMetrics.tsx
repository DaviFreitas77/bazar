
import { useMetricsBilling } from "@/hooks/admin/useMetrics";

export function useDashboardMetrics() {
  const { data: metricsBilling, isLoading } = useMetricsBilling();

  const formatVariation = (variation?: number) => {
    if (variation === undefined || variation === 0) {
      return { footer: "", footerColor: "text-gray-500" };
    }

    return {
      footer: `${variation > 0 ? "+" : ""}${variation}% vs período anterior`,
      footerColor: variation < 0 ? "text-red-500" : "text-green-600",
    };
  };



  const metricsData = [
    {
      title: "Faturamento do dia",
      value: metricsBilling?.billingToday.value  ?? 0,
      ...formatVariation(metricsBilling?.billingToday.variation),
    
      prefix: "R$",
     

    },

    {
      title: "Faturamento Mensal",
      value: metricsBilling?.billingMonth.value ?? 0,
      ...formatVariation(metricsBilling?.billingMonth.variation),
    
        prefix: "R$"
    },

    {
      title: "Faturamento Trimestral",
      value: metricsBilling?.billingCurrentTrimester.value ?? 0,
      ...formatVariation(metricsBilling?.billingCurrentTrimester.variation),
    
        prefix: "R$"
    },

    {
      title: "Faturamento total",
      value: metricsBilling?.billingTotal ?? 0,
      valueStyle: "text-green-600 text-3xl font-bold",
    
       footer:"Receita acumulada",
      prefix: "R$"
    },
  ];

  return { metricsData, isLoading };
}
