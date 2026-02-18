import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { startCronJobs } from "./services/cronService.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes); // Standardizing to /api/auth
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/keys", apiRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/admin", adminRoutes);

// Start Cron Jobs
startCronJobs();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
