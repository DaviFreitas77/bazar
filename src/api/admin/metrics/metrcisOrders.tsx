import { api } from "@/lib/api";

export const apiMetricOrders = async () => {
  const response = await api.get("/metrics/orders/listMetrics");
  return response.data;
};
