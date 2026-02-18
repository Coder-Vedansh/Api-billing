import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
    const { role } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Analytics", path: "/analytics", icon: "📈" },
        { name: "Settings", path: "/settings", icon: "⚙️" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl transition-all duration-300 hidden md:flex z-50">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(79,70,229,0.5)]">A</div>
                    <h1 className="text-xl font-bold text-white tracking-tight">ApiBill</h1>
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
                    <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors group border border-transparent hover:border-slate-800">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {role[0].toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors capitalize">{role}</p>
                            <p className="text-xs text-slate-500 group-hover:text-slate-400">View Profile</p>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto scroll-smooth">
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-40 px-8 py-4 flex justify-between items-center md:hidden shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                        <h1 className="text-xl font-bold text-slate-800">ApiBill</h1>
                    </div>
                    <button className="text-slate-500 hover:text-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </header>
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
