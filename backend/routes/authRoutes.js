import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../services/emailService.js";


const router = express.Router();

// Register (User only)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await User.create({
      name,
      email,
      password: hash,
      otp,
      otpExpires
    });

    await sendEmail(email, "Verify your email", `Your OTP is: ${otp}`);

    res.json({ message: "Registration successful. Please verify your email." });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});





// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Super Admin (Case Insensitive Email)
  if (
    email.toLowerCase() === process.env.SUPER_ADMIN_EMAIL.toLowerCase() &&
    password === process.env.SUPER_ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email: email.toLowerCase(), role: "super_admin" },
      process.env.JWT_SECRET
    );
    return res.json({ token, role: "super_admin" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.isVerified) {
    return res.status(403).json({ message: "Please verify your email first", isVerified: false });
  }



  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token, role: user.role });
});

export default router;
