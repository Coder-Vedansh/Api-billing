const StatCard = ({ title, value, icon, trend, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <span className="text-2xl drop-shadow-sm">{icon}</span>
                </div>
                {trend && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${trend > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
            <p className="text-3xl font-extrabold text-slate-800 tracking-tight">{value}</p>
        </div>
    );
};

export default StatCard;
