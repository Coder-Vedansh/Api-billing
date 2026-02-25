import express from "express";
import User from "../models/User.js";
import APIKey from "../models/APIKey.js";
import Usage from "../models/Usage.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Middleware to check for admin/super_admin
const adminOnly = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "super_admin")) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as admin" });
    }
};

// Get System Overview (Admin/Super Admin)
router.get("/overview", protect(), adminOnly, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const keys = await APIKey.find();
        const usage = await Usage.find().populate("apiKey");

        let totalRequests = 0;
        let totalRevenue = 0;

        usage.forEach(u => {
            if (u.apiKey) {
                totalRequests += u.count;
                totalRevenue += u.count * (u.apiKey.rate || 0.01);
            }
        });

        res.json({
            totalUsers,
            totalKeys: keys.length,
            activeKeys: keys.filter(k => k.isActive).length,
            totalRequests,
            totalRevenue: totalRevenue.toFixed(2)
        });
    } catch (error) {
        console.error("Overview Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Get User List with Stats
router.get("/users", protect(), adminOnly, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        const userStats = await Promise.all(users.map(async (user) => {
            const keys = await APIKey.find({ user: user._id });
            const keyIds = keys.map(k => k._id);
            const usage = await Usage.find({ apiKey: { $in: keyIds } }).populate("apiKey");

            let reqs = 0;
            let rev = 0;
            usage.forEach(u => {
                if (u.apiKey) {
                    reqs += u.count;
                    rev += u.count * (u.apiKey.rate || 0.01);
                }
            });

            return {
                ...user._doc,
                keysCount: keys.length,
                totalRequests: reqs,
                totalRevenue: rev.toFixed(2)
            };
        }));

        res.json(userStats);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Update API Key Rate (Admin Only)
router.put("/keys/:id/rate", protect(), adminOnly, async (req, res) => {
    try {
        const { rate } = req.body;
        const key = await APIKey.findById(req.params.id);

        if (!key) return res.status(404).json({ message: "Key not found" });

        key.rate = rate;
        await key.save();

        res.json({ message: "Rate updated", key });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;
