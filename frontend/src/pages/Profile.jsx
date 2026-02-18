import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { role } = useAuth();

    // Mock user data since we only have role in context currently
    const user = {
        name: "Test User",
        email: "user@example.com",
        role: role,
        joined: "Jan 2024"
    };

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                <p className="text-gray-500">Manage your personal information.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative -top-16 mb-4">
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
                            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                                {user.role[0].toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h3>
                            <p className="text-blue-600 font-medium capitalize mb-6">{user.role}</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Member Since</label>
                                    <p className="text-gray-900">{user.joined}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="font-bold text-gray-900 mb-4">Account Status</h4>
                            <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                                <span className="text-sm font-medium">Active</span>
                            </div>
                            <p className="text-sm text-gray-600">Your account is fully active and you have access to all features available for your role.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
