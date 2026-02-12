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
  idLogradouro: number;
  setIdLogradouro: React.Dispatch<React.SetStateAction<number>>;
  preference: {
    id: string;
    total: number;
    orderId: string;
    created_at: string;
  };
  setPreference: React.Dispatch<
    React.SetStateAction<{
      id: string;
      total: number;
      orderId: string;
      created_at: string;
    }>
  >;
}

// Criação do contexto
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { state } = useCart();
  const [step, setStep] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [idLogradouro, setIdLogradouro] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [preference, setPreference] = useState({
    id: "",
    total: 0,
    orderId: "",
    created_at: "",
  });

  useEffect(() => {
    if (state.length === 0) {
      setDiscount(0);
    }
    if(step ===3){
      setStep(1);
      setPreference({
        id: "",
        total: 0,
        orderId: "",
        created_at: "",
      })
    }
  }, [state]);

  return <CheckoutContext.Provider value={{ step, setStep, total, setTotal, discount, setDiscount, preference, setPreference, idLogradouro, setIdLogradouro }}>{children}</CheckoutContext.Provider>;
}

// para consumir o contexto
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
