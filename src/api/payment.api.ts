
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


export const  apiCreatePreference = async()=>{
  const response = await api.post("/createPreference");
  return response.data;
}
export const  apiProcessPayment = async(formdata:any)=>{

  const response = await api.post("/proccessPayment",formdata);
  return response.data;
}
export const  apiProcessPaymentPix = async(formdata:any)=>{
  console.log(formdata)
  const response = await api.post("/proccessPaymentPix",formdata);
  return response.data;
}

