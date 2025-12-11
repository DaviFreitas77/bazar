import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from "./cartContext";

// Tipagem do contexto
interface CheckoutContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  preference: {
    id: string;
    total: number;
    orderId: string;
  };
  setPreference: React.Dispatch<
    React.SetStateAction<{
      id: string;
      total: number;
      orderId: string;
    }>
  >;
}

// Criação do contexto
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { state } = useCart();
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [preference, setPreference] = useState({
    id: "",
    total: 0,
    orderId: "",
  });

  useEffect(() => {
    if (state.length === 0) {
      setDiscount(0);
    }
  }, [state]);

  return <CheckoutContext.Provider value={{ step, setStep, total, setTotal, discount, setDiscount, preference, setPreference }}>{children}</CheckoutContext.Provider>;
}

// para consumir o contexto
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
