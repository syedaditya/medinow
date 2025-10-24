const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { router: authRoutes } = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => res.send("✅ MediNow Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
