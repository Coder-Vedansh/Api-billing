const StatCard = ({ title, value, icon, trend }) => {
    return (
        <div className="bg-white p-7 rounded-2xl border border-slate-100 premium-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-110 opacity-50"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl text-2xl border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-brand-50 group-hover:border-brand-100 group-hover:text-brand-600 transition-all duration-300">
                        {icon}
                    </div>
                    {trend && (
                        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${trend > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            <span className="text-xs">{trend > 0 ? '↑' : '↓'}</span>
                            {Math.abs(trend)}%
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{title}</h3>
                    <div className="flex items-baseline gap-1">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">{value}</h2>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-brand-500/10 transition-colors"></div>
        </div>
    );
};

export default StatCard;
