import { useEffect, useState } from "react";
import axios from "../api/axios";

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ name: "", description: "", baseRate: 0.01 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchServices = async () => {
        console.log("ServiceManagement: Fetching services...");
        try {
            const { data } = await axios.get("/services/all");
            setServices(data);
            setError(null);
        } catch (error) {
            console.error("ServiceManagement: Failed to fetch services", error);
            setError(error.response?.data?.message || error.message || "Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("ServiceManagement: Component mounted");
        fetchServices();
    }, []);

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (service) => {
        setEditingId(service._id);
        setFormData({ name: service.name, description: service.description, baseRate: service.baseRate });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ name: "", description: "", baseRate: 0.01 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form...", { editingId, formData });

        const payload = {
            ...formData,
            baseRate: parseFloat(formData.baseRate)
        };

        try {
            if (editingId) {
                console.log(`Sending PUT request to /services/${editingId}`);
                await axios.put(`/services/${editingId}`, payload);
                setEditingId(null);
            } else {
                console.log("Sending POST request to /services");
                await axios.post("/services", payload);
            }
            setFormData({ name: "", description: "", baseRate: 0.01 });
            fetchServices();
        } catch (error) {
            console.error("Failed to save service", error);
            const errMsg = error.response
                ? `Server Error: ${error.response.status} - ${error.response.data?.message || 'Unknown'}`
                : `Network/Request Error: ${error.message}`;
            alert("Failed to save: " + errMsg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`/services/${id}`);
            fetchServices();
        } catch (error) {
            console.error("Failed to delete service", error);
        }
    };

    if (loading) return <div className="text-center py-12 text-slate-500">Loading services...</div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Service Management</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">{editingId ? "Edit Service" : "Add New Service"}</h2>
                    {editingId && (
                        <button onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700">
                            Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                        <input
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate ($)</label>
                        <input
                            type="number"
                            step="0.001"
                            required
                            className="w-full px-3 py-2 border rounded-lg"
                            value={formData.baseRate}
                            onChange={(e) => setFormData({ ...formData, baseRate: e.target.value })}
                        />
                    </div>
                    <button type="submit" className={`text-white py-2 px-4 rounded-lg transition-colors ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {editingId ? "Update Service" : "Add Service"}
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rate</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <tr key={service._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                                <td className="px-6 py-4 text-gray-500">{service.description}</td>
                                <td className="px-6 py-4 text-gray-500">${service.baseRate}</td>
                                <td className="px-6 py-4 flex gap-4">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && services.length === 0 && (
                    <div className="p-6 text-center text-gray-500">No services found.</div>
                )}
            </div>
        </div>
    );
};

export default ServiceManagement;
