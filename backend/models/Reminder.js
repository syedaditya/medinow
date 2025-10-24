const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  medicineName: String,
  dosage: String,
  time: Date,
});

module.exports = mongoose.model("Reminder", reminderSchema);
