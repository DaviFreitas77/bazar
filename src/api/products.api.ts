import { api } from "@/lib/api";
import type { Product } from "@/@types/product";
import { useQuery } from "@tanstack/react-query";

export interface ApiProduct {
  id: number;
  name: string;
  price: string;
  lastPrice: string;
  category: number;

  sizes: {
    id: number;
    name: string;
  }[];

  color: {
    id: number;
    name: string;
  }[];

  description: string;

  image: {
    id: number;
    image: string;
  }[];
}

const getProductsByCategory = async (id: number): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(`/productsByCategory/${id}`);
  return data;
};

export const useProductsByCategory = (id: number | null) => {
  return useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: () => {
      if (id === null) throw new Error("Category id is null");
      return getProductsByCategory(id);
    },
    enabled: !!id,
  });
};

export const apiGetProductById = async (id: number): Promise<ApiProduct> => {
  try {
    const { data } = await api.get<ApiProduct>(`/product/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    throw error;
  }
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["productsByCategory", id],
    queryFn: () => {
      return apiGetProductById(id);
    },
    enabled: !!id,
  });
};

export const apiGetAllProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get<Product[]>("/products");
    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

 const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>(`/search/${query}`);
    return response.data;
  } catch (error) {
    console.log(error)
    return [];
  }
};


export const searchParams = (query: string | null) => {
  return useQuery({
    queryKey: ["productsSearched", query],
    queryFn: () => {
      return searchProducts(query || "");
    },
    enabled: !!query,
  });
};
