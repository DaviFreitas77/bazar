import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CheckoutProvider } from "@/context/checkoutContext";
import "./index.css";
import App from "./App.tsx";
import { ProductsSearchedProvider } from "./context/productsSearchedContext.tsx";
import { UserProvider, useUser } from "./context/userContext.tsx";
import axios from "axios";
import { getMe } from "./api/auth.api.ts";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/cartContext.tsx";
const queryClient = new QueryClient();

function InitApp() {
  const { setName, setEmail } = useUser();

  useEffect(() => {
    async function fetchCsrfAndUser() {
      try {
        await axios.get("https://web-production-72b71.up.railway.app/sanctum/csrf-cookie", {
          withCredentials: true,
          withXSRFToken: true,
        });

        const user = await getMe().catch((err) => {
          if (err.response.status === 401) return null;
          throw err;
        });

        if (user) {
          setName(user.name);
          setEmail(user.email);
        }
      } catch (err) {
        console.error("Erro ao pegar CSRF token:", err);
      }
    }

    fetchCsrfAndUser();
  }, []);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ProductsSearchedProvider>
            <CheckoutProvider>
              <StrictMode>
                <InitApp />
                <Toaster />
              </StrictMode>
            </CheckoutProvider>
          </ProductsSearchedProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
