import productsData from "../data/products.json";
import type { Product } from "../types/productType";

export const getProducts = (): Product[] => {
  return productsData.products as Product[];
};

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter((product) => product.category === category);
};

export const filterColorsProducts = (color: string,name:string): Product[] => {
  return getProducts().filter((product) => product.productName.toLocaleLowerCase().includes(name.toLocaleLowerCase())  && product.color.includes(color));
};


export const searchProducts = (query:string):Product[]=>{
  return getProducts().filter((product)=>product.productName.toLowerCase().includes(query.toLowerCase()))
}