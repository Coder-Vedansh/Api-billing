import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
    const { user, role, loading } = useAuth();
    const token = localStorage.getItem("adminToken");

    if (loading) return <div className="flex h-screen items-center justify-center text-slate-500">Loading...</div>;

    if (!token) {
        return <Navigate to="/" />;
    }

    if (roles && !roles.includes(role)) {
        return <Navigate to="/dashboard" />; // Or unauthorized page
    }

    return children;
};

export default ProtectedRoute;
