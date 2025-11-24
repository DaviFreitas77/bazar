import { api } from "@/lib/api";

export const apiLatestOrder = async () => {
  const response  = await api.get(`/latestOrder`);
  return response.data;
};
