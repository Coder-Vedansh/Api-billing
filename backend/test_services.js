
import fetch from 'node-fetch';

const BASE_URL = "http://localhost:5000/api";

const testServicesFlow = async () => {
    try {
        console.log("1. Logging in as Admin...");
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "admin@company.com", password: "adminpassword" }) // Use valid credentials if possible
        });

        if (!loginRes.ok) {
            console.error("Login Failed:", loginRes.status);
            // Try fallback credentials if you know them, or check User model
            return;
        }

        const loginData = await loginRes.json();
        const token = loginData.token;

        console.log("2. Fetching /services/all...");
        const res = await fetch(`${BASE_URL}/services/all`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("Services Data (Count):", data.length);
            console.log("First Service:", data[0]);
        } else {
            console.error("Services Failed:", res.status, await res.text());
        }

    } catch (err) {
        console.error("CRITICAL:", err);
    }
};

testServicesFlow();
