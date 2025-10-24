const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },
  duration: { type: String },
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
