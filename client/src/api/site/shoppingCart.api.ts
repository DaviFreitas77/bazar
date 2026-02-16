import { api } from "@/lib/api";

export const apiAddProduct = async (data: any) => {
  const response = await api.post(`/shoppingCart/add`, {
    idSize: data.size,
    idColor: data.color,
    idProduct: data.id,
    quantity: data.quantity,
  });
  return response.data;
};

export const apiDecrementProduct = async (data: any) => {
  const response = await api.post("/shoppingCart/decrementProduct", {
    idSize: data.size,
    idColor: data.color,
    idProduct: data.id,
    quantity: data.quantity,
  });
  return response.data;
};

export const apiGetCart = async () => {
  const response = await api.get(`/shoppingCart/getCart`);
  return response.data;
};

export const apiShoppingCart = async () => {
  const response = await api.get(`/shoppingCart/getShoppingCart`);
  return response.data;
};
