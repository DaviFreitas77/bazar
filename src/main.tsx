import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CheckoutProvider } from "@/context/checkoutContext";
import "./index.css";
import App from "./App.tsx";
import { ProductsSearchedProvider } from "./context/productsSearcherContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProductsSearchedProvider>
      <CheckoutProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CheckoutProvider>
    </ProductsSearchedProvider>
  </BrowserRouter>
);
