
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Layout from "../components/Layout";

const Services = () => {
    const [services, setServices] = useState([]);
    const [subscribedServices, setSubscribedServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, userRes] = await Promise.all([
                    axios.get("/services"),
                    axios.get("/auth/me")
                ]);
                setServices(servicesRes.data);
                setSubscribedServices(userRes.data.subscribedServices || []);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubscribe = async (serviceId) => {
        try {
            const { data } = await axios.post(`/services/${serviceId}/subscribe`);
            alert(data.message);
            setSubscribedServices(data.subscribedServices);
        } catch (error) {
            alert(error.response?.data?.message || "Subscription failed");
        }
    };

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">API Services Catalog</h2>
                <p className="text-slate-500 mt-1">Explore and subscribe to powerful APIs for your integration.</p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading services...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const isSubscribed = subscribedServices.includes(service._id);
                        return (
                            <div key={service._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all duration-200 group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                        <span className="text-2xl">🔌</span>
                                    </div>
                                    <span className="text-sm font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                                        ${service.baseRate.toFixed(3)} / req
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">{service.description}</p>

                                {isSubscribed ? (
                                    <button disabled className="w-full py-2.5 border border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold rounded-lg cursor-default flex items-center justify-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSubscribe(service._id)}
                                        className="w-full py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-indigo-500/30 active:scale-[0.98]"
                                    >
                                        Subscribe
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {!loading && services.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🔍
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No services found</h3>
                    <p className="text-slate-500 mt-1">Check back later for new API services.</p>
                </div>
            )}
        </Layout>
    );
};

export default Services;
