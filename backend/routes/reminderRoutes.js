const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createReminder, getReminders, deleteReminder } = require("../controllers/reminderController");

// POST - create a new reminder (requires auth)
router.post("/", protect, createReminder);

// GET - fetch all reminders (requires auth)
router.get("/", protect, getReminders);

// DELETE - remove a reminder (requires auth)
router.delete("/:id", protect, deleteReminder);

module.exports = router;
