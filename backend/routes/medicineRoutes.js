const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// Search for a medicine
router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  try {
    const medicines = await Medicine.find({ name: { $regex: query, $options: "i" } });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
