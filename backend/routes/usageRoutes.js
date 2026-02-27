import express from "express";
import Usage from "../models/Usage.js";
import APIKey from "../models/APIKey.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect(), async (req, res) => {
    const keys = await APIKey.find({ user: req.user._id });
    const keyIds = keys.map((k) => k._id);
    const usage = await Usage.find({ apiKey: { $in: keyIds } }).populate("apiKey");
    res.json(usage);
});

router.get("/stats", protect(), async (req, res) => {
    const keys = await APIKey.find({ user: req.user._id });
    const keyIds = keys.map((k) => k._id);

    // Aggregate revenue
    const usage = await Usage.find({ apiKey: { $in: keyIds } }).populate("apiKey");

    let totalRequests = 0;
    let totalRevenue = 0;

    const salesData = usage.reduce((acc, curr) => {
        if (!curr.apiKey) return acc; // Skip if apiKey not found
        
        const date = new Date(curr.date).toLocaleDateString();
        const revenue = curr.count * (curr.apiKey.rate || 0.01);

        totalRequests += curr.count;
        totalRevenue += revenue;

        if (!acc[date]) acc[date] = 0;
        acc[date] += revenue;
        return acc;
    }, {});

    const chartData = Object.keys(salesData).map(date => ({
        date,
        sales: salesData[date]
    }));

    res.json({
        totalUsage: totalRequests,
        currentBill: totalRevenue.toFixed(2),
        activeKeys: keys.filter(k => k.isActive).length,
        chartData
    });
});

router.get("/region", protect(), async (req, res) => {
    try {
        const keys = await APIKey.find({ user: req.user._id });
        const keyIds = keys.map(k => k._id);

        const usage = await Usage.find({ apiKey: { $in: keyIds } });

        const regionStats = usage.reduce((acc, curr) => {
            const region = curr.country || "Unknown";
            if (!acc[region]) acc[region] = 0;
            acc[region] += curr.count;
            return acc;
        }, {});

        const data = Object.keys(regionStats).map(region => ({
            name: region,
            value: regionStats[region]
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
