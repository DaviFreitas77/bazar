
import { apiMetricOrders, apiMetricsBilling } from "@/api/admin/metrics/metricsAdmin";
import { useQuery } from "@tanstack/react-query";

export const useMetricOrders = () => {
  return useQuery({
    queryKey: ["metricOrders"],
    queryFn: apiMetricOrders,
  });
};


export const useMetricsBilling = () => {
  return useQuery({
    queryKey: ["metricsBilling"],
    queryFn: apiMetricsBilling,
  });
};
