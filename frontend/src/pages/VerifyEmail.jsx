import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../api/axios";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
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

        // Focus next input
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
            setError("Please enter a valid 6-digit code.");
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("/auth/verify-otp", { email, otp: code });
            setSuccess(data.message);

            // Store token if returned (auto-login)
            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setTimeout(() => navigate("/"), 2000);
            }

        } catch (err) {
            setError(err.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError("");
        setSuccess("");
        try {
            await axios.post("/auth/resend-otp", { email });
            setSuccess("New code sent to your email.");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to resend OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-3xl"></div>

            <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/50 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Verify Email</h2>
                    <p className="text-slate-500 mt-2">Enter the 6-digit code sent to <br /><span className="font-semibold text-slate-700">{email}</span></p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100 text-center">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                name="otp"
                                maxLength="1"
                                className="w-12 h-12 border border-slate-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
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
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify Account"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        Didn't receive code?{" "}
                        <button onClick={handleResend} className="text-indigo-600 font-bold hover:underline">
                            Resend
                        </button>
                    </p>
                    <div className="mt-4">
                        <Link to="/register" className="text-sm text-slate-400 hover:text-slate-600">Back to Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
