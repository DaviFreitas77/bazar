import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { type ReactNode, useEffect } from "react";
import { LoadingPage } from "../components/site/loading/loadingPage";
import { useUI } from "../context/UIContext";

interface PrivateRouteProps {
  children: ReactNode;
  role?: string;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { name, loading,role } = useUser();
  const { setModalAuth } = useUI();

  useEffect(() => {
    setModalAuth(name === null);
  }, [name, setModalAuth]);

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
