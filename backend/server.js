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
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176", "http://127.0.0.1:5173", "http://127.0.0.1:5174", "http://127.0.0.1:5175", "http://127.0.0.1:5176"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", authRoutes); // Standardizing to /api/auth
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/keys", apiRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/admin", adminRoutes);
import serviceRoutes from "./routes/serviceRoutes.js";
app.use("/api/services", serviceRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API Billing Backend is running");
});

// Start Cron Jobs
startCronJobs();

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
