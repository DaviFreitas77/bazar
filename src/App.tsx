import { Routes, Route, useLocation } from "react-router-dom";
import { Search } from "./pages/search";
import { Product } from "./pages/product";
import { Header } from "./components/ui/header";
import { Checkout } from "./pages/checkout";
import { Orders } from "./pages/orders";
import PrivateRoute from "./PrivateRoute";
import { MyAdress } from "./pages/myAdress";
import { Terms } from "./pages/terms";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";

function App() {
  const location = useLocation();
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

        <Route
          path="/meus-enderecos"
          element={
            <PrivateRoute>
              <MyAdress />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
