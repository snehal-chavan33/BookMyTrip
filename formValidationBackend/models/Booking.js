const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  destination: { type: String, required: true, minlength: 3 },
  date: { type: Date, required: true },
  travelers: { type: Number, required: true, min: 1, max: 20 },
  request: { type: String, maxlength: 200 },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
