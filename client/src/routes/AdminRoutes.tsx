// routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { ProductsAdmin } from "@/pages/admin/ProductsAdmin";

import { RegisterProduct } from "@/pages/admin/RegisterProduct";
import { Dashboard } from "@/pages/admin/Dashboard";
import { EmailAdmin } from "@/pages/admin/Email";
import { Home } from "@/pages/site/home";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute role="admin">
            <Dashboard />
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
