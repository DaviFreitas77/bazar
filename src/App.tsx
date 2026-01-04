import { Routes, Route, useLocation } from "react-router-dom";
import { Search } from "./pages/search";
import { Product } from "./pages/product";
import { Header } from "./components/ui/header";
import { Checkout } from "./pages/checkout";
import { Orders } from "./pages/orders";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();
  return (
    <>
    {location.pathname !== "/checkout" && <Header />}
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/product/:id" element={<Product />} />
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
      </Routes>
    </>
  );
}

export default App;
