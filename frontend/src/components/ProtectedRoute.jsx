import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
    const { role } = useAuth();
    if (!roles.includes(role)) {
        return <Navigate to="/" replace />;
    }
    return children;
}
