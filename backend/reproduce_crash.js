
import fs from 'fs/promises';
import { setTimeout } from 'timers/promises';

async function testFullFlow() {
    const uniqueEmail = `crash_test_${Date.now()}@example.com`;
    console.log(`[1] Registering with email: ${uniqueEmail}`);

    try {
        // 1. Register
        let response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Crash Test', email: uniqueEmail, password: 'password123' })
        });
        console.log('Registration Status:', response.status);

        // 2. Wait for log to be written
        await setTimeout(2000);

        // 3. Read log to get OTP
        const logContent = await fs.readFile('crash_debug_2.log', 'utf-8');
        const otpMatch = logContent.match(new RegExp(`User created: ${uniqueEmail}, OTP: (\\d+)`));

        if (!otpMatch) {
            console.error('Could not find OTP in log file!');
            return;
        }

        const otp = otpMatch[1];
        console.log(`[2] Found OTP: ${otp}`);

        // 4. Verify OTP
        console.log(`[3] Verifying OTP...`);
        response = await fetch('http://localhost:5000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: uniqueEmail, otp })
        });

        const verifyData = await response.json();
        console.log('Verification Response:', verifyData);

        if (verifyData.token) {
            const token = verifyData.token;
            console.log(`[4] Login successful. Token obtained.`);

            // 5. Access Dashboard Endpoints
            console.log(`[5] Accessing Dashboard API...`);

            // Get Keys
            response = await fetch('http://localhost:5000/api/keys', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('GET /keys Status:', response.status);

            // Get Stats
            response = await fetch('http://localhost:5000/api/usage/stats', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('GET /usage/stats Status:', response.status);

            // Generate Key (User might click this)
            console.log(`[6] Generating New Key...`);
            response = await fetch('http://localhost:5000/api/keys/generate', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('POST /keys/generate Status:', response.status);
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testFullFlow();
