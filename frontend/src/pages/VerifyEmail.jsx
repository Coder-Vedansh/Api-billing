import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

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
                    <p className="text-slate-400 mt-2 font-medium text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
                </div>

                {children}
            </div>

            <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                &copy; 2026 APIBILL CLOUD ECOSYSTEM
            </p>
        </div>
    </div>
);

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const emailParam = searchParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const code = otp.join("");
        if (code.length !== 6) {
            setError("Universal code requires 6 digits.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("/auth/verify-otp", { email, otp: code });
            setSuccess(data.message);

            if (data.token) {
                login(data.token, data.role, { name: data.name || "Architect" });
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setTimeout(() => navigate("/"), 2000);
            }

        } catch (err) {
            setError(err.response?.data?.message || "Verification sync failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError("");
        setSuccess("");
        try {
            await axios.post("/auth/resend-otp", { email });
            setSuccess("Satellite sync: New code sent.");
        } catch (err) {
            setError(err.response?.data?.message || "Signal lost: Failed to resend.");
        }
    };

    return (
        <AuthLayout
            title="Integrity Check"
            subtitle={`Enter the 6-digit sync code sent to <br/><span class="font-bold text-slate-800">${email}</span>`}
        >
            {error && (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-2xl border border-rose-100 text-center uppercase tracking-wider">{error}</div>
            )}
            {success && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-2xl border border-emerald-100 text-center uppercase tracking-wider">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="flex justify-center gap-3">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            name="otp"
                            maxLength="1"
                            className="w-12 h-14 bg-slate-50 border border-slate-100 rounded-2xl text-center text-2xl font-black focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all text-slate-900 shadow-sm"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={(e) => e.target.select()}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-xs uppercase tracking-widest disabled:opacity-50"
                >
                    {loading ? "Synchronizing..." : "Complete Integration"}
                </button>
            </form>

            <div className="mt-8 text-center space-y-4">
                <p className="text-slate-400 text-xs font-medium">
                    Lost the signal?{" "}
                    <button onClick={handleResend} className="text-brand-600 font-bold hover:underline">
                        Retry Sync
                    </button>
                </p>
                <div>
                    <Link to="/register" className="text-[10px] font-bold text-slate-300 hover:text-slate-500 uppercase tracking-widest transition-colors">Abort & Rollback</Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default VerifyEmail;
