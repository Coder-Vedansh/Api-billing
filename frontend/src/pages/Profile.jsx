import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

const Profile = () => {
    const { role } = useAuth();
    const [userData, setUserData] = useState({
        name: "Syncing...",
        email: "Syncing...",
        role: role,
        joined: "Syncing..."
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("/auth/me");
                setUserData({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    joined: new Date(data.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                });
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <Layout>
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Personal Profile</h2>
                <p className="text-slate-500 mt-2 font-medium">Manage your identity and access credentials.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 overflow-hidden max-w-4xl relative">
                <div className="h-48 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="px-10 pb-12 relative">
                    <div className="flex flex-col md:flex-row md:items-end gap-8 -mt-20 mb-12 relative z-10">
                        <div className="w-40 h-40 rounded-[2rem] border-8 border-white bg-white flex items-center justify-center shadow-2xl overflow-hidden group">
                            <div className="w-full h-full rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-5xl font-black text-brand-600 transition-transform duration-500 group-hover:scale-110">
                                {userData.name ? userData.name[0].toUpperCase() : 'U'}
                            </div>
                        </div>
                        <div className="flex-1 pb-2">
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-2 font-display">{userData.name}</h3>
                            <div className="flex items-center gap-3">
                                <span className="bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-brand-100/50 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-brand-500"></span> {userData.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Official Email</label>
                                    <p className="text-slate-900 font-bold text-lg">{userData.email}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Member From</label>
                                    <p className="text-slate-900 font-bold text-lg">{userData.joined}</p>
                                </div>
                            </div>

                            <div className="p-1 w-full bg-slate-50 rounded-2xl border border-slate-100">
                                <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-xl border border-slate-200 hover:border-brand-200 hover:text-brand-600 transition-all shadow-sm active:scale-[0.99] text-sm md:w-fit md:px-10">
                                    Edit Core Information
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                                <h4 className="font-bold text-slate-900 mb-6 font-display flex items-center gap-2 relative z-10">
                                    Account Health
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                </h4>
                                <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl w-fit mb-6 border border-emerald-100 relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-widest">Verified & Active</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 relative z-10">
                                    Your secure ID is fully synchronized. All API endpoints and billing modules are currently operational for your account level.
                                </p>
                                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden relative z-10">
                                    <div className="h-full bg-emerald-500 w-[94%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                                </div>
                                <div className="flex justify-between mt-2 relative z-10">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Trust Score</span>
                                    <span className="text-[10px] font-bold text-emerald-600 uppercase">94%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
