import { createContext, useContext, useState } from "react";
import  type { Product } from "@/@types/product";
interface productsSearchedType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  nameProduct: string;
  setNameProduct: React.Dispatch<React.SetStateAction<string>>;
}

const searchedProductsContext = createContext<productsSearchedType | undefined>(undefined);

export function ProductsSearchedProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [nameProduct, setNameProduct] = useState<string>("");
  return <searchedProductsContext.Provider value={{ products, setProducts, nameProduct, setNameProduct }}>{children}</searchedProductsContext.Provider>;
}

// Hook para consumir o contexto
export function useProductsSearched() {
  const context = useContext(searchedProductsContext);
  if (!context) {
    throw new Error("useProductsSearched deve ser usado dentro de ProductsSearchedProvider");
  }
  return context;
}
