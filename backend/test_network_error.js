
import fetch from 'node-fetch';

const BASE_URL = "http://localhost:5000/api";

const testAdminFlow = async () => {
    try {
        console.log("1. Testing Health/Root...");
        try {
            const rootRes = await fetch("http://localhost:5000/");
            console.log("Root Status:", rootRes.status);
        } catch (e) {
            console.log("Root Access Failed:", e.message);
        }

        console.log("\n2. Logging in as Admin...");
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "admin@company.com", password: "adminpassword" }) // Assuming default admin credentials
        });

        const loginData = await loginRes.json();
        console.log("Login Status:", loginRes.status);

        if (!loginRes.ok) {
            console.error("Login Failed:", loginData);
            // Try creating a temp admin if login failed? 
            // Or assume the user has valid creds in their browser.
            // Let's try to register a temp admin if this fails? No, can't easily.
            return;
        }

        const token = loginData.token;
        console.log("Token received.");

        console.log("\n3. Fetching Admin Overview...");
        const overviewRes = await fetch(`${BASE_URL}/admin/overview`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (overviewRes.ok) {
            const overviewData = await overviewRes.json();
            console.log("Overview Data:", overviewData);
        } else {
            console.error("Overview Failed:", overviewRes.status, await overviewRes.text());
        }

        console.log("\n4. Fetching Admin Users...");
        const usersRes = await fetch(`${BASE_URL}/admin/users`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (usersRes.ok) {
            const usersData = await usersRes.json();
            console.log("Users Data (Count):", usersData.length);
        } else {
            console.error("Users Failed:", usersRes.status, await usersRes.text());
        }

    } catch (err) {
        console.error("CRITICAL FAILURE:", err);
    }
};

testAdminFlow();
