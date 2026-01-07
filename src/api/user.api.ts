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

interface UpdateUserResponse {
  name?: string;
  lastName?: string;
  tel?: string;
  email?: string;
}
export const updateUser = async (data: UpdateUserResponse) => {
  try {
    const response = await api.patch("user/update", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


interface MyAdressProps {
  id: number;
  type: string;
  zip_code: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}
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
