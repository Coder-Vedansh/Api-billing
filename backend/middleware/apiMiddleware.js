import APIKey from "../models/APIKey.js";
import Usage from "../models/Usage.js";
import geoip from "geoip-lite";
import requestIp from "request-ip";

export const trackUsage = async (req, res, next) => {
    const key = req.headers["x-api-key"];
    if (!key) return res.status(401).json({ message: "API Key required" });

    const apiKeyDoc = await APIKey.findOne({ key, isActive: true });
    if (!apiKeyDoc) return res.status(403).json({ message: "Invalid API Key" });

    // Location Tracking
    const clientIp = requestIp.getClientIp(req);
    const geo = geoip.lookup(clientIp) || {};
    const country = geo.country || "Unknown";
    const region = geo.region || "Unknown";

    // Increment usage
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let usage = await Usage.findOne({ apiKey: apiKeyDoc._id, date: today });
    if (usage) {
        usage.count++;
        // If location was unknown and now known, maybe update? For now, we keep the first one or just distinct?
        // Simpler: Just count. For detailed region analytics, we might need a separate collection or array of regions,
        // but for this MVP, let's assume one main region per day or aggregated.
        // BETTER APPROACH: Aggregate by Country/Region too?
        // If we want detailed analytics per region, the current Usage model (one doc per day per key) isn't enough IF the key is used from different regions in the same day.
        // However, expanding the model might be too much refactoring.
        // Let's create a new Usage record if the region/country is different?
        // OR: changing the findOne query to include country/region.
    } else {
        // This logic in the *ReplacementContent* is tricky because I can't think inside the tool call.
        // I will implement the "Granular Usage" approach: group by Key + Date + Country + Region.
    }

    // RE-WRITING LOGIC FOR GRANULAR TRACKING
    usage = await Usage.findOne({ apiKey: apiKeyDoc._id, date: today, country, region });

    if (usage) {
        usage.count++;
        await usage.save();
    } else {
        await Usage.create({ apiKey: apiKeyDoc._id, date: today, count: 1, country, region });
    }

    next();
};
