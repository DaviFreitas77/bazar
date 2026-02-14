import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { ProductsSearchedProvider } from "./context/productsSearchedContext.tsx";
import { UserProvider, useUser } from "./context/userContext.tsx";
import {  getMe } from "./api/site/auth.api.ts";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/cartContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";
import { CheckoutProvider } from "./context/checkoutContext.tsx";

const queryClient = new QueryClient();

function InitApp() {
  const navigate = useNavigate();
  const { setName, setEmail, setLoading, setLastName, setTel, setRole,setNewsLetter } = useUser();

  useEffect(() => {
    async function fetchCsrfAndUser() {
      try {
  
        const user = await getMe().catch((err) => {
          if (err.response.status === 401) return null;
          throw err;
        });

        if (user) {
        
          setNewsLetter(user.receive_newsletter)
          setName(user.name);
          setEmail(user.email);
          setTel(user.tel);
          setLastName(user.lastName);
          setRole(user.role);

          if (user.role === "admin") {
            navigate("/admin-dashboard");
          }
        }
      } catch (err) {
        console.error("Erro ao pegar CSRF token:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCsrfAndUser();
  }, [setName, setEmail, setLoading]);

  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <UIProvider>
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
        </UIProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
