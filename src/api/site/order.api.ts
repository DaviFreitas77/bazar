import { api } from "@/lib/api";

import type { CartItem } from "@/context/cartContext";
import type { OrderProps } from "../@types/order";

export const apiLatestOrder = async () => {
  const response  = await api.get(`order/latestOrder`);
  return response.data;
};



export const myOrder = async()=>{
  const response = await api.get<OrderProps[]>('order/listOrderUser');
  return response.data;

}


export const createOrder = async(items:Array<CartItem>,idLogradouro:number)=>{
  const response = await api.post('order/create',{items:items,idLogradouro:idLogradouro});
  return response.data;
}