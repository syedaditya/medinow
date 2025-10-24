const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  dosage: String,
});

module.exports = mongoose.model("Medicine", medicineSchema);
