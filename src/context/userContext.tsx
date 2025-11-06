import { createContext, useContext, useState } from "react";

// Tipagem do contexto
interface UserContextType {
  name: string;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  return <userContext.Provider value={{ name, email, setName, setEmail }}>{children}</userContext.Provider>;
}

export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
