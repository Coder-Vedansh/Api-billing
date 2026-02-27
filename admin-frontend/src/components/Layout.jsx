import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, LogOut, Settings, BarChart3, Menu, X, ShieldCheck } from "lucide-react";

const Layout = ({ children }) => {
    const { role, logout } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: "Terminal", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Ecosystem", path: "/services", icon: <BarChart3 size={18} /> },
        { name: "Identities", path: "/dashboard", icon: <Users size={18} /> },
        { name: "Architecture", path: "/dashboard", icon: <Settings size={18} /> },
    ];

    return (
        <div className="flex h-screen bg-[#fcfdfe] font-sans overflow-hidden selection:bg-brand-100 selection:text-brand-900">
            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-slate-950 text-slate-400 flex flex-col z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                md:relative md:translate-x-0 md:flex border-r border-white/5
            `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 bg-brand-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-brand-600/30 group-hover:scale-110 transition-transform duration-500">
                            A
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-white tracking-widest uppercase font-display">Archon</h1>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] -mt-1">Admin OS v4</p>
                        </div>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Core Protocols</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path && (location.pathname === "/dashboard" ? item.name === "Terminal" : true);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                    ? "bg-brand-600 font-bold text-white shadow-xl shadow-brand-600/20"
                                    : "hover:bg-white/5 hover:text-slate-200"
                                    }`}
                            >
                                <span className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-brand-400'}`}>{item.icon}</span>
                                <span className="text-sm tracking-tight">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 space-y-4">
                    <div className="p-4 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                {role?.[0]?.toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold text-white truncate font-display">Console Interface</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{role} Mode</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 group border border-rose-500/10 hover:border-rose-500/20 shadow-lg hover:shadow-rose-500/20 active:scale-95">
                        <LogOut size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
                    </button>

                    <p className="text-center text-[9px] font-bold text-slate-700 uppercase tracking-[0.2em]">Build Core-v4-Alpha</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scroll-smooth w-full relative">
                {/* Visual Background Noise */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>

                {/* Mobile Header */}
                <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 px-6 py-5 flex justify-between items-center md:hidden shadow-sm">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-500 hover:text-brand-600 transition-colors">
                            <Menu size={24} />
                        </button>
                        <div className="w-9 h-9 bg-slate-950 rounded-xl flex items-center justify-center text-white font-bold text-xl">A</div>
                        <h1 className="text-lg font-black text-slate-950 font-display">ARCHON</h1>
                    </div>
                </header>

                <div className="p-6 md:p-12 max-w-7xl mx-auto min-h-full flex flex-col animate-in">
                    <div className="flex-1">
                        {children}
                    </div>

                    <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
                        <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                            <ShieldCheck size={14} className="text-brand-500" /> Secure Admin Interface v4.0.1
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                            System Status: <span className="text-emerald-500">Optimal</span>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default Layout;
