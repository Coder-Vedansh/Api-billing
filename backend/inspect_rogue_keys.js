
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import APIKey from './models/APIKey.js';

dotenv.config();

async function inspectKeys() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB via", process.env.MONGO_URI);

        const rogueKeys = await APIKey.find({ user: { $exists: false } });
        console.log(`Found ${rogueKeys.length} keys without user.`);

        if (rogueKeys.length === 0) {
            // Maybe user is null instead of missing?
            const nullUserKeys = await APIKey.find({ user: null });
            console.log(`Found ${nullUserKeys.length} keys with user: null.`);
            console.log(JSON.stringify(nullUserKeys, null, 2));
        } else {
            console.log(JSON.stringify(rogueKeys, null, 2));
        }

        // Also just list LAST 5 keys to be sure
        const lastKeys = await APIKey.find().sort({ createdAt: -1 }).limit(5);
        console.log("Last 5 keys created:", JSON.stringify(lastKeys, null, 2));

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

inspectKeys();
