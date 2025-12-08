import { Navigate } from "react-router-dom";
import { useUser } from "./context/userContext";
import { type ReactNode } from "react";
import { LoadingPage } from "./components/loading/loadingPage";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { name, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage />
      </div>
    );
  }
  return name ? children : <Navigate to="/" />;
}
