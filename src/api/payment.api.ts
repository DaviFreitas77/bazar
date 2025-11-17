
import type { CartItem } from "@/context/cartContext";
import { api } from "@/lib/api";

export const apiCreatePayment = async (method:string,items:Array<CartItem>) => {
  console.log(method,items)
  const response = await api.post("/createPayment", {items,method });
  return response.data;
};


export const apiChangeStatusOrder = async ()=>{
  const response = await api.post("/changeStatus");
  return response.data;
}