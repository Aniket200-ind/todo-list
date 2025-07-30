//! File: src/components/ProtectedRoute.jsx

import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
