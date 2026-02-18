import Layout from "../components/Layout";

const Settings = () => {
    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                <p className="text-gray-500">Manage your account preferences.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input type="password" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input type="password" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input type="password" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div className="pt-4">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Preferences</h3>
                <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
