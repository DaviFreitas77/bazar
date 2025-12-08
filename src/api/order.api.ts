import { api } from "@/lib/api";

export const apiLatestOrder = async () => {
  const response  = await api.get(`order/latestOrder`);
  return response.data;
};

export const myOrder = async()=>{
  const response = await api.get('order/myOrder');
  return response.data;

}