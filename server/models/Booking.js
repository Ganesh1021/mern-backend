const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  slotId: String,
  date: String,
});

module.exports = mongoose.model("Booking", bookingSchema);
