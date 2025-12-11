import { api } from "@/lib/api";

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
