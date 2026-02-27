import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
    const { user, logout, role } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const navItems = [
        { name: "Overview", path: "/dashboard", icon: "📊" },
        { name: "API Services", path: "/services", icon: "🔌" },
        { name: "My Profile", path: "/profile", icon: "👤" },
        { name: "Settings", path: "/settings", icon: "⚙️" },
    ];

    const isAdmin = role === "admin" || role === "super_admin";

    return (
        <div className="flex h-screen bg-[#fcfdfe] font-sans overflow-hidden">
            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-slate-950 text-slate-400 flex flex-col z-50 transition-all duration-500 ease-in-out border-r border-slate-900
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
                md:relative md:translate-x-0 md:flex
            `}>
                <div className="p-8 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/20">
                            A
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight font-display">ApiBill</h1>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-slate-500 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <div className="px-4 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Main Menu</div>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${isActive
                                    ? "bg-brand-600/10 text-brand-400 border border-brand-500/20"
                                    : "hover:bg-slate-900 hover:text-slate-200 border border-transparent"
                                    }`}
                            >
                                <span className={`text-lg transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(79,90,239,0.5)]' : 'group-hover:scale-110'}`}>{item.icon}</span>
                                {item.name}
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(79,90,239,0.8)]"></div>}
                            </Link>
                        );
                    })}

                    {isAdmin && (
                        <div className="pt-8 px-4">
                            <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Admin</div>
                            <a
                                href="http://localhost:5176"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-slate-900 hover:text-slate-200 border border-transparent group"
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform">🛡️</span>
                                Admin Panel
                            </a>
                        </div>
                    )}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-900 mb-4 transition-all hover:border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-600/20 flex items-center justify-center text-sm font-bold text-brand-400 uppercase border border-brand-500/20 shadow-inner">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate font-display">{user?.name || "User"}</p>
                                <p className="text-[10px] text-slate-500 truncate uppercase tracking-widest font-bold">{role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 hover:text-red-400 bg-slate-900 border border-slate-800 rounded-xl transition-all hover:border-red-900/30 hover:bg-red-950/20"
                        >
                            <span>🚪</span> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden h-screen w-full relative">
                <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-6 md:px-10 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2.5 -ml-2 text-slate-500 md:hidden hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        <h2 className="text-xl font-bold text-slate-900 font-display">
                            {navItems.find(i => location.pathname === i.path)?.name || "Dashboard"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-3 text-[11px] font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            System Live
                        </div>
                        <div className="h-8 w-[1px] bg-slate-100 hidden sm:block"></div>
                        <button className="p-2.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto px-6 py-8 md:px-10 md:py-12 scrollbar-thin">
                    <div className="max-w-[1400px] mx-auto animate-in">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
