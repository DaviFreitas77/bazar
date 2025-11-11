import { createContext, useContext, useState } from "react";

// Tipagem do contexto
interface UserContextType {
  name: string | null;
  email: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  return <userContext.Provider value={{ name, email, setName, setEmail }}>{children}</userContext.Provider>;
}




export function useUser() {
  
  const context = useContext(userContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
