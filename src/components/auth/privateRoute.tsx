import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthController from "../../controllers/auth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthController.isAuthenticated();
      setIsAuthenticated(authenticated.success);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
