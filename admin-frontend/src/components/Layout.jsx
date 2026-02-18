import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Users, LogOut, Settings, BarChart3 } from "lucide-react";

const Layout = ({ children }) => {
    const { role, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        // Add more items based on role if needed
    ];

    if (role === 'super_admin') {
        // Super Admin could have extra items
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-all duration-300 hidden md:flex z-50">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">A</div>
                    <h1 className="text-xl font-bold text-white tracking-tight">AdminPanel</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">Menu</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20"
                                    : "hover:bg-slate-800/50 hover:text-white"
                                    }`}
                            >
                                <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'}`}>{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-900/20 text-red-400 hover:text-red-300 transition-colors group border border-transparent hover:border-red-900/30">
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                    <div className="mt-4 flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                            {role ? role[0].toUpperCase() : 'A'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-white truncate capitalize">{role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {/* Mobile Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 px-8 py-4 flex justify-between items-center md:hidden shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                        <h1 className="text-xl font-bold text-slate-800">AdminPanel</h1>
                    </div>
                    {/* Simplified mobile menu trigger for now */}
                    <button className="text-slate-500">Menu</button>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
