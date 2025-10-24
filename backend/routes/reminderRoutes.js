const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const verifyFirebaseToken = require("../middleware/authmiddleware");

// Add a reminder (protected)
router.post("/", verifyFirebaseToken, async (req, res) => {
  try {
    const reminder = new Reminder({
      ...req.body,
      userId: req.user.uid, // pulled from Firebase token
    });
    await reminder.save();
    res.json({ message: "Reminder added", reminder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reminders for user (protected)
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.uid });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
