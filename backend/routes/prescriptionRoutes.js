const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createPrescription, getPrescriptions, deletePrescription } = require("../controllers/prescriptionController");

// Create prescription
router.post("/", protect, createPrescription);

// Get prescriptions for user
router.get("/", protect, getPrescriptions);

// Delete prescription
router.delete("/:id", protect, deletePrescription);

module.exports = router;
