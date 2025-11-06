import { createContext, useContext, useState } from "react";

// Tipagem do contexto
interface CheckoutContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

// Criação do contexto
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);

  return <CheckoutContext.Provider value={{ step, setStep }}>{children}</CheckoutContext.Provider>;
}

// para consumir o contexto
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
