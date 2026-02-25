
const StatCard = ({ title, value, icon, trend }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-lg text-2xl border border-slate-100 text-slate-600">
                    {icon}
                </div>
                {trend && (
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>

            <div>
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h2>
            </div>
        </div>
    );
};

export default StatCard;
