import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setRole(storedRole);
      // We could fetch user profile here if needed
      setUser({ name: localStorage.getItem("userName") || "User" });
    }
    setLoading(false);
  }, []);

  const login = (token, userRole, userData = {}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    if (userData.name) localStorage.setItem("userName", userData.name);

    setRole(userRole);
    setUser({ name: userData.name || "User" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
