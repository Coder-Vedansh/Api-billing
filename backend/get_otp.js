
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");
        const users = await User.find({}).sort({ _id: -1 }).limit(1);
        if (users.length > 0) {
            console.log(`Latest User: ${users[0].email}`);
            console.log(`OTP: ${users[0].otp}`);
        } else {
            console.log("No users found");
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
