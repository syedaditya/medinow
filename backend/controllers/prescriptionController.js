const Prescription = require("../models/Prescription");

// Create a new prescription
const createPrescription = async (req, res) => {
  try {
    const { medicine, dosage, duration } = req.body;

    if (!medicine || !dosage) {
      return res.status(400).json({ message: "Medicine and dosage are required" });
    }

    const prescription = new Prescription({
      userId: req.user.uid,
      medicine,
      dosage,
      duration,
    });

    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    console.error("Create prescription error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all prescriptions for logged-in user
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.user.uid });
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Get prescriptions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) return res.status(404).json({ message: "Prescription not found" });
    if (prescription.userId !== req.user.uid)
      return res.status(403).json({ message: "Not authorized" });

    await prescription.deleteOne();
    res.json({ message: "Prescription deleted" });
  } catch (error) {
    console.error("Delete prescription error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createPrescription, getPrescriptions, deletePrescription };
