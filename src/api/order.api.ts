import { api } from "@/lib/api";
import type { myOrderProps } from "./@types/order";

export const apiLatestOrder = async () => {
  const response  = await api.get(`order/latestOrder`);
  return response.data;
};



export const myOrder = async()=>{
  const response = await api.get<myOrderProps[]>('order/myOrder');
  return response.data;

}