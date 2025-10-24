const Reminder = require("../models/Reminder");

// Create a new reminder
const createReminder = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: "Title and date are required" });
    }

    const reminder = new Reminder({
      title,
      description,
      date,
      userId: req.user.uid, // comes from protect middleware
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    console.error("Create reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reminders for logged-in user
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user.uid });
    res.status(200).json(reminders);
  } catch (error) {
    console.error("Get reminders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a reminder
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) return res.status(404).json({ message: "Reminder not found" });
    if (reminder.userId !== req.user.uid) return res.status(403).json({ message: "Not authorized" });

    await reminder.deleteOne();
    res.json({ message: "Reminder deleted" });
  } catch (error) {
    console.error("Delete reminder error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createReminder, getReminders, deleteReminder };
