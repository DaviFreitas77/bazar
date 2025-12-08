import { createContext, useContext, useState } from "react";

// Tipagem do contexto
interface UserContextType {
  name: string | null;
  email: string | null;
  loading: boolean;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const userContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return <userContext.Provider value={{ name, email, setName, setEmail,loading,setLoading }}>{children}</userContext.Provider>;
}




export function useUser() {
  
  const context = useContext(userContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}
