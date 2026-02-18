import express from "express";
import crypto from "crypto";
import APIKey from "../models/APIKey.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate API Key
router.post("/generate", protect(), async (req, res) => {
    const key = crypto.randomBytes(32).toString("hex");
    const newKey = await APIKey.create({ key, user: req.user._id });
    res.json(newKey);
});

// Get User API Keys
router.get("/", protect(), async (req, res) => {
    const keys = await APIKey.find({ user: req.user._id });
    res.json(keys);
});

// Delete API Key
router.delete("/:id", protect(), async (req, res) => {
    await APIKey.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Key deleted" });
});

export default router;
