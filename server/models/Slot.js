const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    bookedCount: {    // consistent field name for bookings count
      type: Number,
      default: 0,
    },
    maxBookings: {
      type: Number,
      default: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
