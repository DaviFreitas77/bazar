import { createContext, useContext, useState } from "react";

interface productsSearchedType {
  products: ProductProps.Product[];
  setProducts: React.Dispatch<React.SetStateAction<ProductProps.Product[]>>;
}


const searchedProductsContext = createContext<productsSearchedType | undefined>(undefined);

export function ProductsSearchedProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductProps.Product[]>([]);

  return (
    <searchedProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </searchedProductsContext.Provider>
  );
}

// Hook para consumir o contexto
export function useProductsSearched() {
  const context = useContext(searchedProductsContext);
  if (!context) {
    throw new Error("useProductsSearched deve ser usado dentro de ProductsSearchedProvider");
  }
  return context;
}
