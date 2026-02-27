import Layout from "../components/Layout";

const Settings = () => {
    return (
        <Layout>
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">System Settings</h2>
                <p className="text-slate-500 mt-2 font-medium">Fine-tune your account security and interface preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 p-10 md:p-12 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-50 rounded-full -mr-20 -mt-20 opacity-50"></div>

                        <div className="flex items-center gap-4 mb-10 relative z-10">
                            <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white text-xl shadow-xl shadow-slate-900/10">
                                🔐
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 font-display">Security Protocol</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage credentials</p>
                            </div>
                        </div>

                        <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Current Signature</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">New Key</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Confirm Key</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button className="w-full md:w-fit px-10 py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/25 active:scale-95 text-xs uppercase tracking-widest">
                                    Refresh Security Stack
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8 order-1 lg:order-2">
                    <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden premium-shadow">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
                        <h4 className="font-bold text-lg mb-8 font-display flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-xs border border-white/10 shadow-inner">🔔</span>
                            Notifications
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="space-y-1">
                                    <span className="text-sm font-bold block">Live Monitoring</span>
                                    <span className="text-[9px] text-slate-500 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_8px_rgba(79,90,239,0.5)]"></span> Email Alerts
                                    </span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 premium-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-110"></div>
                        <h4 className="font-bold text-lg text-slate-900 mb-4 font-display relative z-10">Need Assistance?</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 relative z-10">
                            Can't find what you're looking for? Reach out to our technical architecture team for priority support.
                        </p>
                        <button className="w-full py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all text-[10px] uppercase tracking-widest relative z-10">
                            Contact Support Hub
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
