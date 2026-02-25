import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user"
  },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
  subscribedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
