
import { apiMetricOrders } from "@/api/admin/metrics/metrcisOrders";
import { useQuery } from "@tanstack/react-query";

export const useMetricOrders = () => {
  return useQuery({
    queryKey: ["metricOrders"],
    queryFn: apiMetricOrders,
  });
};

