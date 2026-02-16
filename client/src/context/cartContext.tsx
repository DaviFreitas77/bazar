import { apiGetCart } from "@/api/site/shoppingCart.api";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useUser } from "./userContext";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: number;
  size: number;
  colorName: string;
  sizeName: string;
}

export type CartAction =
  | { type: "setState"; payload: CartItem[] }
  | { type: "addItem"; payload: CartItem }
  | { type: "increment"; payload: { id: number; color: number; size: number } }
  | { type: "decrement"; payload: { id: number; color: number; size: number } }
  | { type: "delete"; payload: { id: number; color: number; size: number } }
  | { type: "clear" };

export function cartReducer(state: CartItem[], action: CartAction) {
  switch (action.type) {
    case "setState":
      return action.payload;

    case "addItem":
      const existingItem = state.find((item) => item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size);

      if (existingItem) {
        return state.map((item) => (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...state, action.payload];

    case "increment":
      return state.map((item) => (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size ? { ...item, quantity: item.quantity + 1 } : item));

    case "decrement":
      return state.map((item) => (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size ? (item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : null) : item)).filter((item) => item !== null);

    case "delete":
      return state.filter((item) => item.id !== action.payload.id && item.color !== action.payload.color && item.size !== action.payload.size);

    case "clear":
      return [];

    default:
      return state;
  }
}

interface CartContextType {
  state: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { name } = useUser();
  const [state, dispatch] = useReducer(cartReducer, [], () => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });


  useEffect(() => {
    const fetchCart = async () => {
      if (!name) return;

      localStorage.removeItem("cart");
      dispatch({ type: "setState", payload: [] });

      try {
        const itemsFromDb = await apiGetCart();

        // Joga o carrinho do banco para dentro do state local
        dispatch({ type: "setState", payload: itemsFromDb.productsCart });
      } catch (err) {
        console.error("Erro ao obter o carrinho", err);
      }
    };
    fetchCart();
  }, [name]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>");
  }
  return context;
}
