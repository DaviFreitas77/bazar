// routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
      >
      </Route>
    </Routes>
  );
}
