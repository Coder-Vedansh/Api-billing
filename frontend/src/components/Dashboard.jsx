import { useEffect, useState } from "react";
import { generateAPIKey, getAPIKeys, deleteAPIKey, getDashboardStats } from "../api/dashboard";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";
import StatCard from "./StatCard";
import SalesChart from "./SalesChart";

const Dashboard = () => {
    const { role } = useAuth();
    const [keys, setKeys] = useState([]);
    const [stats, setStats] = useState({
        totalRequests: 0,
        totalRevenue: "0.00",
        activeKeys: 0,
        chartData: []
    });

    const fetchData = async () => {
        const [keysres, statsRes] = await Promise.all([
            getAPIKeys(),
            getDashboardStats()
        ]);
        setKeys(keysres.data);
        setStats(statsRes.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGenerate = async () => {
        await generateAPIKey();
        fetchData();
    };

    const handleDelete = async (id) => {
        await deleteAPIKey(id);
        fetchData();
    };

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                <p className="text-gray-500">Welcome back, here's what's happening with your APIs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon="💰" color="bg-green-100 text-green-600" trend={12} />
                <StatCard title="Total Requests" value={stats.totalRequests} icon="⚡" color="bg-blue-100 text-blue-600" trend={5} />
                <StatCard title="Active Keys" value={stats.activeKeys} icon="🔑" color="bg-purple-100 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SalesChart data={stats.chartData} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-80 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">API Keys</h3>
                        <button onClick={handleGenerate} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
                            + New
                        </button>
                    </div>
                    <div className="space-y-4">
                        {keys.map((key) => (
                            <div key={key._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <p className="font-mono text-sm text-gray-800 font-medium">{key.key.substring(0, 16)}...</p>
                                    <p className="text-xs text-gray-500">Rate: ${key.rate || 0.01}/req</p>
                                </div>
                                <button onClick={() => handleDelete(key._id)} className="text-red-500 hover:text-red-700 p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        {keys.length === 0 && <p className="text-gray-400 text-center py-4">No active keys</p>}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
