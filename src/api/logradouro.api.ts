import { api } from "@/lib/api";
import type { MyAdressProps } from "./@types/adress";

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

export const getLogradouro = async () => {
  try {
    const response = await api.get("checkout/logradouroUser");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyLogradouro = async () => {
  try {
    const response = await api.get<MyAdressProps[]>("user/myLogradouro");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLogradouro = async (id: number) => {
  try {
    const response = await api.delete(`user/deleteLogradouro/${id}`);
    return response.data;
  } catch (error) {}
};
