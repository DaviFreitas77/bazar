import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getZipCode = async (zipCode: string) => {
  const response = await api.post("checkout/checkZipCode", { zipCode });
  return response.data;
};


export const createLogradouro = async (logradouro: CheckoutProps.InformationsAdressProps) => {
  try {
    const response = await api.post("checkout/logradouro", logradouro);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar logradouro:", error);
  }
};


const getLogradouro = async() =>{
  try{
    const response = await api.get("checkout/logradouroUser");
    return response.data;
  }catch(error){
    console.log(error)
  }

}

export const useLogradouro = () =>{
  return useQuery({
    queryKey:["logradouro"],
    queryFn:getLogradouro
  })
}