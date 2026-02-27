import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "./Layout";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsage: 0,
        currentBill: 0,
        activeKeys: 0,
        chartData: []
    });
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, keysRes] = await Promise.all([
                axios.get("/usage/stats"),
                axios.get("/keys")
            ]);
            setStats(statsRes.data || {
                totalUsage: 0,
                currentBill: 0,
                activeKeys: 0,
                chartData: []
            });
            setKeys(Array.isArray(keysRes.data) ? keysRes.data : []);
            setError(null);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("Unable to connect to the analytics server. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        try {
            await axios.post("/keys/generate");
            fetchDashboardData();
        } catch (error) {
            alert("Failed to generate key");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) return;
        try {
            await axios.delete(`/keys/${id}`);
            fetchDashboardData();
        } catch (error) {
            alert("Failed to delete key");
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-brand-500/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] animate-pulse">Initializing Data Ecosystem</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-8 text-center px-4 max-w-lg mx-auto">
                    <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 text-5xl border border-rose-100 shadow-xl shadow-rose-500/10">⚠️</div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 font-display">Connection Disrupted</h2>
                        <p className="text-slate-500 mt-2 font-medium text-sm leading-relaxed">{error}</p>
                    </div>
                    <button
                        onClick={fetchDashboardData}
                        className="px-8 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-all font-bold shadow-xl shadow-brand-500/25 active:scale-95"
                    >
                        Try Reconnecting
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Performance Overview</h2>
                    <p className="text-slate-500 mt-2 font-medium">Welcome back! Monitor your API usage and billing performance.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleGenerate} className="bg-brand-600 text-white px-6 py-3.5 rounded-xl hover:bg-brand-700 transition-all font-bold shadow-lg shadow-brand-500/20 flex items-center gap-2.5 active:scale-95 text-xs uppercase tracking-widest">
                        <span className="text-xl leading-none font-normal">+</span> Generate API Key
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <StatCard title="Current Bill" value={`$${stats.currentBill}`} icon="💰" trend={12.4} />
                <StatCard title="Total Usage" value={stats.totalUsage.toLocaleString()} icon="⚡" trend={5.2} />
                <StatCard title="Active Keys" value={stats.activeKeys} icon="🔑" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <SalesChart data={stats.chartData} title="Usage Analytics" color="#4f5aef" />
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 premium-shadow h-[520px] flex flex-col">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 font-display">Your API Keys</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Managed credentials</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
                            🔒
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-3 scrollbar-thin">
                        {keys.map((key) => (
                            <div key={key._id} className="group p-5 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/20 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-mono text-[11px] text-slate-600 font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-all group-hover:border-brand-100 select-all">
                                        {key.key.substring(0, 16)}...
                                    </div>
                                    <button onClick={() => handleDelete(key._id)} className="text-slate-400 hover:text-rose-500 transition-all bg-white p-2 rounded-lg border border-slate-100 hover:border-rose-100 hover:shadow-sm shadow-blue-500/5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 border border-emerald-100/50 uppercase">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Active
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">${key.rate || 0.01}/req</span>
                                </div>
                            </div>
                        ))}
                        {keys.length === 0 && (
                            <div className="h-full py-12 flex flex-col items-center justify-center text-center">
                                <span className="text-5xl mb-4 opacity-10">🔑</span>
                                <p className="text-slate-400 text-sm font-medium font-display">No active keys found</p>
                                <p className="text-slate-300 text-xs mt-1 font-medium">Generate your first key to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
