// routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Dashboard } from "@/pages/admin/dashboard";
import { OrdersAdmin } from "@/pages/admin/orders";
import { EmailAdmin } from "@/pages/admin/email";



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
      >
      </Route>
      <Route
        path="/lista-pedidos"
        element={
          <PrivateRoute role="admin">
            <OrdersAdmin />
        
          </PrivateRoute>
        }
      >
      </Route>
      <Route
        path="/broadCast"
        element={
          <PrivateRoute role="admin">
            <EmailAdmin   />
        
          </PrivateRoute>
        }
      >
      </Route>
    </Routes>
  );
}
