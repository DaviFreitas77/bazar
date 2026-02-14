
import type { CartItem } from "@/context/cartContext";
import { api } from "@/lib/api";

// export const apiCreatePayment = async (method:string,items:Array<CartItem>) => {
//   console.log(method,items)
//   const response = await api.post("/createPayment", {items,method });
//   return response.data;
// };



export const apiChangeStatusOrder = async ()=>{
  const response = await api.post("/changeStatus");
  return response.data;
}


//mercado pago
export const  apiCreatePreference = async(items:Array<CartItem>)=>{
  const response = await api.post("mcp/createPreference",{items});
  return response.data;
}

export const  apiProcessPayment = async(formdata:any,order:string)=>{
  const response = await api.post("mcp/proccessPaymentCard",{formdata,order});
  return response.data;
}


export const  apiProcessPaymentPix = async(formdata:any,order:string)=>{
  const response = await api.post("mcp/proccessPaymentPix",{formdata,order});
  return response.data;
}

