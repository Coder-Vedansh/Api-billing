import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { role } = useAuth();
  return roles.includes(role) ? children : <Navigate to="/" />;
}
