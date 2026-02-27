import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";

const AuthLayout = ({ children, title, subtitle }) => (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe] relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-md w-full px-6 relative z-10 animate-in">
            <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 p-10 md:p-12 overflow-hidden relative text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

                <div className="mb-10 relative z-10">
                    <div className="w-16 h-16 bg-slate-950 rounded-[1.25rem] flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-2xl shadow-slate-900/20 transform hover:scale-105 transition-transform duration-500">
                        A
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-950 font-display tracking-tight">{title}</h2>
                    <p className="text-slate-400 mt-2 font-medium text-sm leading-relaxed">{subtitle}</p>
                </div>

                {children}
            </div>

            <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                &copy; 2026 APIBILL CLOUD ECOSYSTEM
            </p>
        </div>
    </div>
);

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            await resetPassword(email, otp, newPassword);
            setMessage("Identity key updated. Redirecting...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Sync update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Update Credentials" subtitle="Enter your sync code and define a new access key">
            {message && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-2xl border border-emerald-100 uppercase tracking-widest">{message}</div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-2xl border border-rose-100 uppercase tracking-widest">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Universal ID</label>
                    <input
                        type="email"
                        className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-2xl focus:outline-none text-slate-500 font-medium cursor-not-allowed"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        readOnly={!!searchParams.get("email")}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Sync Code</label>
                    <input
                        type="text"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-black tracking-[0.3em] text-center"
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">New Access Key</label>
                    <input
                        type="password"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-xs uppercase tracking-widest disabled:opacity-50 mt-2"
                >
                    {loading ? "Updating..." : "Establish New Key"}
                </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium">
                <Link to="/" className="text-slate-300 hover:text-slate-500 transition-colors">Cancel & Rollback</Link>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
