import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
    key: { type: String, unique: true, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    rate: { type: Number, default: 0.01 }, // Cost per request in $
});

export default mongoose.model("APIKey", apiKeySchema);
