
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to DB");
        const user = await User.findOne({ email: "vedansh@gmail.com" });
        if (user) {
            console.log(`User: ${user.email}`);
            console.log(`isVerified: ${user.isVerified}`);
            console.log(`OTP: ${user.otp}`);

            if (!user.isVerified) {
                console.log("Setting manual OTP to 123456...");
                user.otp = "123456";
                user.otpExpires = Date.now() + 10 * 60 * 1000;
                await user.save();
                console.log("OTP set to 123456");
            }
        } else {
            console.log("User vedansh@gmail.com not found");
            // List all users to see who is there
            const allUsers = await User.find({}, 'email isVerified');
            console.log("All users:", allUsers);
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
