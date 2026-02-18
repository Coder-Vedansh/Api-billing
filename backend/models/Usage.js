import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
    apiKey: { type: mongoose.Schema.Types.ObjectId, ref: "APIKey", required: true },
    date: { type: Date, default: Date.now }, // We can normalize this to start of day for daily aggregation
    count: { type: Number, default: 0 },
    country: { type: String, default: "Unknown" },
    region: { type: String, default: "Unknown" },
});

export default mongoose.model("Usage", usageSchema);
