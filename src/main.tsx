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

function InitApp() {
  const { setName, setEmail } = useUser();

  useEffect(() => {
    async function fetchCsrfAndUser() {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
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
  <BrowserRouter>
    <UserProvider>
      <ProductsSearchedProvider>
        <CheckoutProvider>
          <StrictMode>
            <InitApp />
          </StrictMode>
        </CheckoutProvider>
      </ProductsSearchedProvider>
    </UserProvider>
  </BrowserRouter>
);
