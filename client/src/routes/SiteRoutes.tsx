import { Home } from "@/pages/site/home";
import { Product } from "@/pages/site/product";
import { Search } from "@/pages/site/search";
import { Terms } from "@/pages/site/terms";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Checkout } from "@/pages/site/checkout";
import { Orders } from "@/pages/site/orders";
import { Footer } from "@/components/site/footer";
import { NotFound } from "@/pages/notFound";
import { Header } from "@/components/ui/header";
import { ModalAuth } from "@/components/site/auth/modalAuth";
import { useUI } from "@/context/UIContext";

function SiteRoutes() {
  const location = useLocation();
  const { modalAuth, setModalAuth } = useUI();
  return (
    <>
      {location.pathname !== "/checkout" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesquisa" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/termos" element={<Terms />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        {/* 
        <Route
          path="/meus-enderecos"
          element={
            <PrivateRoute>
              <MyAdress />
            </PrivateRoute>
          }
        /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ModalAuth open={modalAuth} onClose={() => setModalAuth(false)} />
      <Footer />
    </>
  );
}

export default SiteRoutes;
