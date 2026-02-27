
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
            <div className="mb-12">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">API Services Catalog</h2>
                <p className="text-slate-500 mt-2 font-medium">Explore and subscribe to powerful APIs for your next big project.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-[40vh] space-y-4">
                    <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Scanning Ecosystem...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {services.map((service) => {
                        const isSubscribed = subscribedServices.includes(service._id);
                        return (
                            <div key={service._id} className="bg-white p-8 rounded-2xl premium-shadow border border-slate-100 transition-all duration-300 group flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100 group-hover:bg-brand-50 group-hover:border-brand-100 transition-all duration-300">
                                        🔌
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Base Rate</span>
                                        <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                                            ${service.baseRate.toFixed(3)}<span className="text-[10px] text-slate-400 font-bold ml-1">/req</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-display group-hover:text-brand-600 transition-colors">{service.name}</h3>
                                    <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">{service.description}</p>
                                </div>

                                <div className="relative z-10 pt-4 border-t border-slate-50">
                                    {isSubscribed ? (
                                        <div className="w-full py-3.5 bg-brand-50 text-brand-700 font-bold rounded-xl border border-brand-100/50 flex items-center justify-center gap-2.5 text-xs uppercase tracking-widest cursor-default">
                                            <span className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(79,90,239,0.5)]"></span> Active Service
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleSubscribe(service._id)}
                                            className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-xs uppercase tracking-widest"
                                        >
                                            Connect Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!loading && services.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 premium-shadow">
                    <div className="w-20 h-20 bg-slate-50 rounded-2.5xl flex items-center justify-center text-4xl mb-6 shadow-inner border border-slate-100">
                        🔍
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">No services found</h3>
                    <p className="text-slate-400 mt-2 font-medium">We're expanding our API ecosystem. Check back soon!</p>
                </div>
            )}
        </Layout>
    );
};

export default Services;
