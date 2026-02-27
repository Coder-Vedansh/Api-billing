import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mongoose from "mongoose";

dotenv.config();

const testDashboard = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const User = mongoose.model("User", new mongoose.Schema({ email: String, role: String }));
        const user = await User.findOne({ role: "user" });

        if (!user) {
            console.log("No test user found");
            process.exit(1);
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        console.log("Generated token for:", user.email);

        const baseUrl = "http://localhost:5000/api";
        const headers = { Authorization: `Bearer ${token}` };

        console.log("Testing /usage/stats...");
        const statsRes = await fetch(`${baseUrl}/usage/stats`, { headers });
        const statsData = await statsRes.json();
        console.log("Stats Response Status:", statsRes.status);
        console.log("Stats Response:", JSON.stringify(statsData, null, 2));

        console.log("Testing /keys...");
        const keysRes = await fetch(`${baseUrl}/keys`, { headers });
        const keysData = await keysRes.json();
        console.log("Keys Response Status:", keysRes.status);
        console.log("Keys Response:", JSON.stringify(keysData, null, 2));

        console.log("Dashboard data test successful!");
        process.exit(0);
    } catch (error) {
        console.error("Test failed:", error.message);
        process.exit(1);
    }
};

testDashboard();
