import { api } from "@/lib/api"


export const apiAllOrders = async() =>{
  const response = await api.get('/order/allOrders');
  return response.data;
}