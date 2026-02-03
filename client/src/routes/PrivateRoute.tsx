import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { type ReactNode } from "react";
import { LoadingPage } from "../components/site/loading/loadingPage";

interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { name, loading,role } = useUser();



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage />
      </div>
    );
  }
  
  if(role === 'admin') return children;

  return name === null ? <Navigate to="/" /> : children;
}
