import { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { loginUser, registerUser } from "./api/auth";

const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe] relative overflow-hidden font-sans">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
    </div>

    <div className="max-w-md w-full px-6 relative z-10 animate-in">
      <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 p-10 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 bg-slate-950 rounded-[1.25rem] flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-2xl shadow-slate-900/20 transform hover:scale-105 transition-transform duration-500">
            A
          </div>
          <h2 className="text-3xl font-extrabold text-slate-950 font-display tracking-tight">{title}</h2>
          <p className="text-slate-400 mt-2 font-medium text-sm">{subtitle}</p>
        </div>

        {children}
      </div>

      <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        &copy; 2026 APIBILL CLOUD ECOSYSTEM
      </p>
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginUser(email, password);
      if (data.isVerified === false) {
        navigate(`/verify-email?email=${email}`);
        return;
      }
      login(data.token, data.role, data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Access denied. Check your credentials.");
    }
  };

  return (
    <AuthLayout title="Authenticate" subtitle="Access your global API infrastructure">
      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-2xl flex items-center gap-3 border border-rose-100 animate-shake">
          <span className="text-lg leading-none">⚠️</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Universal ID</label>
          <input
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            placeholder="name@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Credential</label>
            <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-brand-600 hover:text-brand-700 hover:underline uppercase tracking-wider">Reset PK</Link>
          </div>
          <input
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-xs uppercase tracking-widest mt-2">
          Synchronize Session
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400 font-medium tracking-tight">
        New architect? <Link to="/register" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">Create Identity</Link>
      </p>
    </AuthLayout>
  );
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await registerUser(name, email, password);
      navigate(`/verify-email?email=${email}`);
    } catch (err) {
      setError(err.response?.data?.message || "Onboarding failed. Validate your inputs.");
    }
  };

  return (
    <AuthLayout title="Connect" subtitle="Join the next generation of API orchestration">
      {error && (
        <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-2xl border border-rose-100">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-2xl border border-emerald-100">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Identity Name</label>
          <input
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            placeholder="John Architect"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Universal ID</label>
          <input
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            placeholder="name@organization.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Define PK</label>
          <input
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-xs uppercase tracking-widest mt-2">
          Initialize Identity
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400 font-medium tracking-tight">
        Existing architect? <Link to="/" className="text-brand-600 font-bold hover:text-brand-700 transition-colors">Sign In</Link>
      </p>
    </AuthLayout>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["super_admin", "user"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute roles={["super_admin", "user"]}>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute roles={["super_admin", "user"]}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute roles={["super_admin", "user"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
