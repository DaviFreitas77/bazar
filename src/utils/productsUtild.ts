import productsData from "../data/products.json";
import type { Product } from "../types/productType";

export const getProducts = (): Product[] => {
  return productsData.products as Product[];
};

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter((product) => product.category === category);
};

export const getProductById = (id: number): Product[] => {
  return getProducts().filter((product) => product.id === id);
};

export const filterColorsProducts = (
  color: string,
  products: Product[]
): Product[] => {
  return products.filter((p) => p.color.includes(color));
};

export const filterSizesProducts = (
  size: string,
  products: Product[]
): Product[] => {
  return products.filter((p) => p.sizes.includes(size));
};

export const searchProducts = (query: string): Product[] => {
  return getProducts().filter((product) =>
    product.productName.toLowerCase().includes(query.toLowerCase())
  );
};
