const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { router: authRoutes } = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes"); // ✅ Move this up

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Define routes BEFORE starting the server
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// ✅ Health + root routes for Docker healthcheck
app.get("/", (req, res) => res.send("✅ MediNow Backend Running"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
