import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/auth";
import { ShieldCheck, Lock, Mail, Terminal, Activity } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data } = await loginUser(email, password);
            if (data.role !== 'admin' && data.role !== 'super_admin') {
                setError("Access Denied: Admin authorization required.");
                setLoading(false);
                return;
            }
            login(data.token, data.role, { name: data.name || "Administrator" });
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials. Protocol sync failed.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe] relative overflow-hidden font-sans">
            {/* Dark Energy Field Background */}
            <div className="absolute inset-0 bg-[#020617] overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at center, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="max-w-md w-full px-6 relative z-10 animate-in">
                <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] premium-shadow border border-white/5 p-10 md:p-12 overflow-hidden relative text-center">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-16 -mt-16"></div>

                    <div className="mb-10 relative z-10">
                        <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center text-slate-950 font-bold text-3xl mx-auto mb-6 shadow-2xl shadow-white/10 transform hover:scale-110 transition-transform duration-500">
                            A
                        </div>
                        <h2 className="text-3xl font-black text-white font-display tracking-tight uppercase">Archon Core</h2>
                        <p className="text-slate-400 mt-2 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                            <ShieldCheck size={12} className="text-brand-500" /> Admin Access Protocol
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-rose-500/10 text-rose-400 text-[10px] font-black rounded-2xl border border-rose-500/20 text-center uppercase tracking-widest animate-shake">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Universal ID</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white/10 focus:outline-none transition-all placeholder:text-slate-600 font-medium text-white text-sm"
                                    placeholder="admin@core.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white/10 focus:outline-none transition-all placeholder:text-slate-600 font-medium text-white text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl shadow-white/5 active:scale-[0.98] text-[10px] uppercase tracking-[0.2em] disabled:opacity-50 mt-4"
                        >
                            {loading ? "Authorizing..." : "Initiate Terminal"}
                        </button>
                    </form>

                    <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
                        <Terminal size={16} className="text-white" />
                        <Activity size={16} className="text-white" />
                        <ShieldCheck size={16} className="text-white" />
                    </div>
                </div>

                <p className="mt-8 text-center text-[9px] font-black text-slate-700 uppercase tracking-[0.3em]">
                    &copy; 2026 Archon Cloud OS // Terminal Access 4.0
                </p>
            </div>
        </div>
    );
};

export default Login;
