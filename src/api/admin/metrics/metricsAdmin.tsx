import { api } from "@/lib/api";

export const apiMetricOrders = async () => {
  const response = await api.get("/metrics/listMetrics");
  return response.data;
};






export interface BillingMetric {
  value: number;
  variation: number;
}

export interface BillingMetricsResponse {
  billingTotal: number;

  billingToday: BillingMetric;
  billingMonth: BillingMetric;
  billingCurrentTrimester: BillingMetric;
}

export const apiMetricsBilling = async() =>{
  const response = await api.get<BillingMetricsResponse>("/metrics/billing");
  return response.data;

}