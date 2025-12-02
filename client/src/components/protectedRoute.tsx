import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../Hooks/UserAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
