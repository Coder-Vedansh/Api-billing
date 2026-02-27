import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SalesChart = ({ data, title = "Analytics Overview", color = "#4f5aef", dataKey = "sales", formatter = (val) => val }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 premium-shadow h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{title}</h3>
                    <p className="text-xs text-slate-500 font-medium">Real-time performance metrics</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-white text-slate-900 shadow-sm border border-slate-100 rounded-lg">30D</button>
                        <button className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900">7D</button>
                    </div>
                </div>
            </div>
            <div className="flex-1 h-80 min-h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorChart" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                                <stop offset="95%" stopColor={color} stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            tickFormatter={formatter}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderRadius: '16px',
                                border: 'none',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                                padding: '12px 16px'
                            }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '13px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '11px', marginBottom: '4px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            formatter={(value) => [formatter(value), 'Revenue']}
                            cursor={{ stroke: '#cbd5e1', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorChart)"
                            activeDot={{ r: 6, fill: color, stroke: "#fff", strokeWidth: 3, shadow: '0 0 10px rgba(0,0,0,0.1)' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;
