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
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, keysRes] = await Promise.all([
                axios.get("/usage/stats"),
                axios.get("/keys")
            ]);
            setStats(statsRes.data);
            setKeys(keysRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
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
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`/keys/${id}`);
            fetchDashboardData();
        } catch (error) {
            alert("Failed to delete key");
        }
    };

    return (
        <Layout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h2>
                    <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your APIs.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleGenerate} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all font-medium shadow-sm hover:shadow-indigo-500/30 flex items-center gap-2 active:scale-95">
                        <span className="text-lg">+</span> Generate New API Key
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Current Bill" value={`$${stats.currentBill}`} icon="💰" trend={12} />
                <StatCard title="Total Usage" value={stats.totalUsage} icon="⚡" trend={5} />
                <StatCard title="Active Keys" value={stats.activeKeys} icon="🔑" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Usage Analytics</h3>
                    </div>
                    <SalesChart data={stats.chartData} color="#4f46e5" />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Your API Keys</h3>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {keys.map((key) => (
                            <div key={key._id} className="group p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-mono text-sm text-slate-700 font-bold bg-white px-2 py-1 rounded border border-slate-200">
                                        {key.key.substring(0, 16)}...
                                    </div>
                                    <button onClick={() => handleDelete(key._id)} className="text-slate-400 hover:text-red-500 transition-colors bg-white p-1 rounded-md border border-slate-100 hover:border-red-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Active
                                    </span>
                                    <span className="font-medium">Rate: ${key.rate || 0.01}/req</span>
                                </div>
                            </div>
                        ))}
                        {keys.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <span className="text-4xl mb-2 opacity-30">🔑</span>
                                <p>No active keys found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
