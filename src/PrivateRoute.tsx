import { Navigate } from "react-router-dom";
import { useUser } from "./context/userContext";
import { type ReactNode, useEffect } from "react";
import { LoadingPage } from "./components/loading/loadingPage";
import { useUI } from "./context/UIContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { name, loading } = useUser();
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

  return name === null ? <Navigate to="/" /> : children;
}
