import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";

const Dashboard = () => {
    const { role } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Admin Specific State
    const [editingKey, setEditingKey] = useState(null);
    const [newRate, setNewRate] = useState("");

    // Super Admin Specific State
    const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
    const [adminMsg, setAdminMsg] = useState("");

    const fetchData = async () => {
        try {
            // Super Admin gets Overview
            if (role === "super_admin") {
                const overviewRes = await axios.get("/admin/overview");
                setStats(overviewRes.data);
            }

            // Both get Users (but Admin uses it for Billing)
            const usersRes = await axios.get("/admin/users");
            setUsers(usersRes.data);
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [role]);

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/super-admin/create-admin", newAdmin);
            setAdminMsg("Admin created successfully!");
            setNewAdmin({ name: "", email: "", password: "" });
            // Refresh data potentially?
        } catch (error) {
            console.error("Error creating admin:", error);
            setAdminMsg("Failed to create admin.");
        }
    };

    // Placeholder for key management
    const manageKeys = (userId) => {
        alert(`Manage keys for user ${userId} coming soon`);
    }

    if (loading) return <Layout><div className="flex h-full items-center justify-center text-slate-500">Loading...</div></Layout>;

    return (
        <Layout>
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {role === 'super_admin' ? 'Super Admin Dashboard' : 'Billing & Pricing Dashboard'}
                    </h2>
                    <p className="text-slate-500 mt-1">
                        {role === 'super_admin' ? 'Global analytics and system management.' : 'Manage API pricing and client billing.'}
                    </p>
                </div>
                <div className="text-sm text-slate-400 font-medium bg-slate-100 px-3 py-1 rounded-lg">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* SUPER ADMIN VIEW: Global Analytics */}
            {role === "super_admin" && stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon="💰" color="bg-green-100 text-green-600" />
                    <StatCard title="Total Requests" value={stats.totalRequests} icon="⚡" color="bg-blue-100 text-blue-600" />
                    <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="bg-purple-100 text-purple-600" />
                    <StatCard title="Active Keys" value={stats.activeKeys} icon="🔑" color="bg-indigo-100 text-indigo-600" />
                </div>
            )}

            {/* SUPER ADMIN VIEW: Create Admin */}
            {role === "super_admin" && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 mb-8 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Plus size={20} /></div>
                        <h3 className="text-lg font-bold text-slate-800">Create New Admin</h3>
                    </div>

                    {adminMsg && <p className={`mb-4 text-sm px-4 py-2 rounded-lg ${adminMsg.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{adminMsg}</p>}

                    <form onSubmit={handleCreateAdmin} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                    placeholder="Jane Doe" value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                    placeholder="jane@company.com" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                type="password" placeholder="••••••••" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} required />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20">
                                Create Admin
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ADMIN VIEW: Billing & Pricing Table */}
            {/* Show for both or just admin? Usually Super Admin can also see this. Let's show for both or just Admin if strictly separated. 
                Task said "AdminBilling page" but since we are combining into Dashboard for simplification first, let's show for both or just Admin.
                Let's show for both for now so Super Admin has full visibility. */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">User Billing & API Rates</h3>
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><Search size={18} /></button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"><Filter size={18} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50/50 text-slate-500 uppercase font-bold text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Requests</th>
                                <th className="px-6 py-4">Total Cost</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
                                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            {user.totalRequests}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono font-medium text-slate-700">${user.totalRevenue}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => manageKeys(user._id)} className="text-indigo-600 hover:text-indigo-800 font-medium text-xs uppercase tracking-wide transition-colors">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
