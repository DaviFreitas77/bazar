import { apiGetCart, apiSyncCart } from "@/api/shoppingCart.api";
import React, { createContext, useContext, useEffect, useReducer} from "react";
import { useUser } from "./userContext";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: number | null;
  size?: number | null;
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
      return state.map((item) => (item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size ? { ...item, quantity: item.quantity - 1 } : item));

    case "delete":
      return state.filter((item) => item.id !== action.payload.id && item.color !== action.payload.color && item.size !== action.payload.size);

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
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const syncCart = async () => {
      if (!name) return;
        await apiSyncCart(state);
      
    };

    const fetchCart = async () => {
      if (!name) return;
      try {
        const itemsFromDb = await apiGetCart();

        // Joga o carrinho do banco para dentro do state local
        dispatch({ type: "setState", payload: itemsFromDb });
      } catch (err) {
        console.error("Erro ao obter o carrinho", err);
      }
    };

    syncCart();
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
