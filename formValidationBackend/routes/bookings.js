const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, message: "Booking created!", booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, errors: err.errors });
  }
});

// READ all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ single booking by id
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE booking
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking updated!", booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, errors: err.errors });
  }
});

// DELETE booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
