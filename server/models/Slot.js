// const mongoose = require("mongoose");

// const SlotSchema = new mongoose.Schema({
//   time: { type: String, required: true },
//   date: { type: String, required: true },
//   bookings: { type: Number, default: 0 },
//   maxBookings: { type: Number, default: 20 }, // ✅ this line is required!
// });

// module.exports = mongoose.model("Slot", SlotSchema);


const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  time: String,
  date: String,
  bookedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Slot", slotSchema);
