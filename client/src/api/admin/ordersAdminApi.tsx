import { api } from "@/lib/api"


export const apiAllOrders = async() =>{
  const response = await api.get('/order/allOrders');
  return response.data;
}


export const apiListItemsOrder = async(orderId: number) =>{
  const response = await api.get(`/order/listItemsOrder/${orderId}`);
  return response.data.items;
}