// routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ProductsAdmin } from "@/pages/admin/ProductsAdmin";
import { OrdersAdmin } from "@/pages/admin/orders";
import { EmailAdmin } from "@/pages/admin/email";
import { RegisterProduct } from "@/pages/admin/RegisterProduct";
import { Dashboard } from "@/pages/admin/dashboard";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute role="admin">
            <Dashboard />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/admin-lista-pedidos"
        element={
          <PrivateRoute role="admin">
            <OrdersAdmin />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/admin-email"
        element={
          <PrivateRoute role="admin">
            <EmailAdmin />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/admin-produtos"
        element={
          <PrivateRoute role="admin">
            <ProductsAdmin />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/admin/novo-produto"
        element={
          <PrivateRoute role="admin">
            <RegisterProduct />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
