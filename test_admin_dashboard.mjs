import axios from 'axios';

const API_URL = "http://localhost:5000/api";
const ADMIN_EMAIL = "vedanshsinghal2912@gmail.com";
const ADMIN_PASS = "superadmin@2912";

async function testDashboard() {
    try {
        console.log("Attempting login...");
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASS
        });

        const token = loginRes.data.token;
        console.log("Login success! Token received.");

        console.log("\nFetching /admin/overview...");
        const overviewRes = await axios.get(`${API_URL}/admin/overview`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Overview Data:", JSON.stringify(overviewRes.data, null, 2));

        console.log("\nFetching /admin/users...");
        const usersRes = await axios.get(`${API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Users Data (count):", usersRes.data.length);

    } catch (error) {
        console.error("Test Failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error("Message:", error.message);
        }
    }
}

testDashboard();
