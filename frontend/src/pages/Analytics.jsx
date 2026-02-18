import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import { getDashboardStats } from "../api/dashboard";
import axios from "../api/axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);

                const regionRes = await axios.get("/usage/region");
                setRegionData(regionRes.data);
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <Layout><div className="text-center mt-20">Loading...</div></Layout>;
    if (!stats) return <Layout><div className="text-center mt-20 text-red-500">Error loading data.</div></Layout>;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Analytics</h2>
                <p className="text-slate-500">Deep dive into your API usage and revenue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon="💰" color="bg-green-100 text-green-600" />
                <StatCard title="Total Requests" value={stats.totalRequests} icon="⚡" color="bg-blue-100 text-blue-600" />
                <StatCard title="Avg. Revenue/Req" value={`$${(stats.totalRevenue / (stats.totalRequests || 1)).toFixed(4)}`} icon="📊" color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Active Keys" value={stats.activeKeys} icon="🔑" color="bg-purple-100 text-purple-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="text-xl">📈</span> Revenue Trend
                    </h3>
                    <SalesChart data={stats.chartData} />
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <span className="text-xl">🌍</span> Traffic by Region
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={regionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {regionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Analytics;
