import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CheckoutProvider } from "@/context/checkoutContext";
import "./index.css";
import App from "./App.tsx";
import { ProductsSearchedProvider } from "./context/productsSearchedContext.tsx";
import { UserProvider, useUser } from "./context/userContext.tsx";
import { ensureCsrf, getMe } from "./api/auth.api.ts";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/cartContext.tsx";
import { UIProvider } from "./context/UIContext.tsx";
const queryClient = new QueryClient();

function InitApp() {
  const { setName, setEmail, setLoading,setLastName,setTel } = useUser();

  useEffect(() => {
    async function fetchCsrfAndUser() {
      try {
        await ensureCsrf();

        const user = await getMe().catch((err) => {
          if (err.response.status === 401) return null;
          throw err;
        });

        if (user) {
          setName(user.name);
          setEmail(user.email);
          setTel(user.tel);
          setLastName(user.lastName);
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
                {/* <StrictMode> */}
                  <InitApp />
                  <Toaster />
                {/* </StrictMode> */}
              </CheckoutProvider>
            </ProductsSearchedProvider>
          </CartProvider>
        </UIProvider>
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
