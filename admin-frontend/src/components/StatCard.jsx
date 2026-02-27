const StatCard = ({ title, value, icon, trend, color }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] premium-shadow border border-slate-100 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-50 group-hover:scale-110 transition-transform duration-500 ${color || 'bg-brand-50 text-brand-600 border-brand-100/50'}`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${trend > 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${trend > 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></span>
                        {trend > 0 ? '+' : ''}{trend}%
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-extrabold text-slate-900 tracking-tight font-display">{value}</p>
                    {trend !== undefined && <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Growth</span>}
                </div>
            </div>

            <div className="mt-8 h-1 w-full bg-slate-50 rounded-full overflow-hidden relative z-10">
                <div className={`h-full rounded-full transition-all duration-1000 w-[65%] ${trend > 0 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.3)]'}`}></div>
            </div>
        </div>
    );
};

export default StatCard;
