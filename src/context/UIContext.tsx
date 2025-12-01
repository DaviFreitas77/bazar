import { createContext, useContext, useState } from "react";

export interface UIContextProps {
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;

  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;

  openFavorite: boolean;
  setOpenFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);

  return (
    <UIContext.Provider
      value={{
        openSearch,
        setOpenSearch,
        openCart,
        setOpenCart,
        openFavorite,
        setOpenFavorite,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used inside a <UIProvider>");
  }

  return context;
}

