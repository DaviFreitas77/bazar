import { api } from "@/lib/api";
import type { MyAdressProps } from "./@types/adress";

export const getZipCode = async (zipCode: string) => {
  const response = await api.post("logradouro/checkZipCode", { zipCode });
  return response.data;
};

export const createLogradouro = async (logradouro: CheckoutProps.InformationsAdressProps) => {
  try {
    const response = await api.post("logradouro/logradouro", logradouro);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar logradouro:", error);
  }
};



export const getMyLogradouro = async () => {
  try {
    const response = await api.get<MyAdressProps[]>("logradouro/myLogradouro");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLogradouro = async (id: number) => {
  try {
    const response = await api.delete(`logradouro/deleteLogradouro/${id}`);
    return response.data;
  } catch (error) {}
};
