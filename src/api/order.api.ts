import { api } from "@/lib/api";
import type { myOrderProps } from "./@types/order";
import type { CartItem } from "@/context/cartContext";

export const apiLatestOrder = async () => {
  const response  = await api.get(`order/latestOrder`);
  return response.data;
};



export const myOrder = async()=>{
  const response = await api.get<myOrderProps[]>('order/myOrder');
  return response.data;

}


export const createOrder = async(items:Array<CartItem>)=>{
  const response = await api.post('order/createOrder',{items});
  return response.data;
}