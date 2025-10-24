const express = require("express");
const router = express.Router();
const admin = require("../config/firebase");
const User = require("../models/User");

// Verify Firebase token middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Login or register user
router.post("/login", async (req, res) => {
  const { uid, name, email, age } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = await User.create({ uid, name, email, age });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { router, verifyToken };
