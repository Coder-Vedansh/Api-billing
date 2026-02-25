
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");

        // Check for Super Admin Email in DB
        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
        if (superAdminEmail) {
            console.log(`Checking for user with Super Admin email: ${superAdminEmail}`);
            const user = await User.findOne({ email: { $regex: new RegExp(`^${superAdminEmail}$`, 'i') } });
            if (user) {
                console.log("Found user document for Super Admin email!");
                console.log(user);
            } else {
                console.log("No user document found for Super Admin email.");
            }
        }

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
