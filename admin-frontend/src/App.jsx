import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ServiceManagement from "./pages/ServiceManagement";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["super_admin", "admin"]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute roles={["super_admin", "admin"]}>
            <Layout>
              <ServiceManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
