import { Loading } from "@/components/site/loading/loading";
import { useMetricsBilling } from "@/hooks/admin/useMetrics";




export function useDashboardMetrics() {
  const { data: metricsBilling, isLoading } = useMetricsBilling();



  
  const loadingFallback = (
    <div className="py-5">
      <Loading />
    </div>
  );

  const metricsData = [
    {
      title: "Faturamento do dia",
      value: metricsBilling
        ? metricsBilling.billingToday.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : loadingFallback,
      footer: metricsBilling ? `+${metricsBilling.billingToday.variation}% vs dia anterior` : "",
      footerColor: "text-green-600",
    },

    {
      title: "Faturamento Mensal",
      value: metricsBilling
        ? metricsBilling.billingMonth.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : loadingFallback,
      footer: metricsBilling ? `+${metricsBilling.billingMonth.variation}% vs mês anterior` : "",
      footerColor: "text-green-600",
    },

    {
      title: "Faturamento Trimestral",
      value: metricsBilling
        ? metricsBilling.billingCurrentTrimester.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : loadingFallback,
      footer: metricsBilling ? `+${metricsBilling.billingCurrentTrimester.variation}% vs trimestre anterior` : "",
      footerColor: metricsBilling && metricsBilling.billingCurrentTrimester.variation < 0 ? "text-red-500" : "text-green-600",
    },

    {
      title: "Faturamento total",
      value: metricsBilling
        ? metricsBilling.billingTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })
        : loadingFallback,
    },
  ];

  return { metricsData, isLoading };
}
