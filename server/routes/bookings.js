// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");
// const Slot = require("../models/Slot");
// const authMiddleware = require("../middleware/auth");

// // 📅 Get all slots for a specific date
// router.get("/slots", authMiddleware, async (req, res) => {
//   try {
//     const { date } = req.query;
//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     // Get all slots for that date
//     let slots = await Slot.find({ date });

//     // If no slots exist yet for that date, create 4 default ones
//     // if (slots.length === 0) {
//     //   const defaultTimes = [
//     //     "06:00 AM - 07:00 AM",
//     //     "07:00 AM - 08:00 AM",
//     //     "05:00 PM - 06:00 PM",
//     //     "06:00 PM - 07:00 PM",
//     //     "07:00 PM - 08:00 PM",
//     //   ];


//     //   const newSlots = defaultTimes.map(
//     //     (time) => new Slot({ time, date, bookings: 0 })
//     //   );

//     //   await Slot.insertMany(newSlots);
//     //   slots = await Slot.find({ date });
//     // }
//     if (slots.length === 0) {
//   const defaultTimes = [
//     "06:00 AM - 07:00 AM",
//     "07:00 AM - 08:00 AM",
//     "05:00 PM - 06:00 PM",
//     "06:00 PM - 07:00 PM",
//     "07:00 PM - 08:00 PM",
//   ];

//   const newSlots = defaultTimes.map(
//     (time) => new Slot({ time, date, bookings: 0 })
//   );

//   await Slot.insertMany(newSlots);
//   slots = await Slot.find({ date });
// }


//     // Format data for frontend
//     const formatted = slots.map((slot) => ({
//       _id: slot._id,
//       time: slot.time,
//       remainingSeats: slot.maxBookings - slot.bookings,
//     }));

//     res.json({ slots: formatted });
//   } catch (err) {
//     console.error("Error fetching slots:", err);
//     res.status(500).json({ message: "Error fetching slots" });
//   }
// });

// // 🧾 Book a slot
// router.post("/book", authMiddleware, async (req, res) => {
//   const { slotId, date } = req.body;
//   try {
//     const slot = await Slot.findById(slotId);
//     if (!slot) return res.status(404).json({ success: false, message: "Slot not found" });

//     // Check if slot full
//     if (slot.bookings >= slot.maxBookings)
//       return res.json({ success: false, message: "Slot Full" });

//     // Prevent same user from booking same slot/date again
//     const existingBooking = await Booking.findOne({
//       user: req.user._id,
//       slot: slot.time,
//       date,
//     });
//     if (existingBooking)
//       return res.json({ success: false, message: "You already booked this slot" });

//     // Create booking
//     const newBooking = new Booking({
//       user: req.user._id,
//       slot: slot.time,
//       date,
//     });
//     await newBooking.save();

//     // Update slot count
//     slot.bookings += 1;
//     await slot.save();

//     res.json({ success: true, slot, date });
//   } catch (err) {
//     console.error("Error booking slot:", err);
//     res.status(500).json({ success: false, message: "Error booking slot" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const authMiddleware = require("../middleware/auth");

// 📅 Get all slots for a specific date
router.get("/slots", authMiddleware, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ slots: [], userHasBooked: false, message: "Date is required" });
    }

    // Get all slots for that date
    let slots = await Slot.find({ date });

    // If no slots exist yet, create default ones
    if (slots.length === 0) {
      const defaultTimes = [
        "06:00 AM - 07:00 AM",
        "07:00 AM - 08:00 AM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
        "07:00 PM - 08:00 PM",
      ];
      const newSlots = defaultTimes.map(
        (time) => new Slot({ time, date, bookings: 0, maxBookings: 20 })
      );
      await Slot.insertMany(newSlots);
      slots = await Slot.find({ date });
    }

    // Check if user has already booked any slot on this date
    const userBooking = await Booking.findOne({
      user: req.user._id,
      date,
    });
    const userHasBooked = !!userBooking;

    // Format slots for frontend
    const formatted = slots.map((slot) => ({
      _id: slot._id,
      time: slot.time,
      remainingSeats: slot.maxBookings - slot.bookings,
    }));

    // ✅ Send both slots and whether user has booked
    res.json({ slots: formatted, userHasBooked });
  } catch (err) {
    console.error("Error fetching slots:", err);
    res
      .status(500)
      .json({ slots: [], userHasBooked: false, message: "Error fetching slots" });
  }
});

// 🧾 Book a slot
router.post("/book", authMiddleware, async (req, res) => {
  const { slotId, date } = req.body;
  try {
    const slot = await Slot.findById(slotId);
    if (!slot)
      return res
        .status(404)
        .json({ success: false, message: "Slot not found" });

    // Check if slot is full
    if (slot.bookings >= slot.maxBookings)
      return res.json({ success: false, message: "Slot Full" });

    // Check if user already booked any slot for this date
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      date,
    });
    if (existingBooking)
      return res.json({
        success: false,
        message: "You have already booked a slot for this date",
      });

    // Create booking
    const newBooking = new Booking({
      user: req.user._id,
      slot: slot.time,
      date,
    });
    await newBooking.save();

    // Update slot count
    slot.bookings += 1;
    await slot.save();

    res.json({ success: true, slot, date });
  } catch (err) {
    console.error("Error booking slot:", err);
    res
      .status(500)
      .json({ success: false, message: "Error booking slot" });
  }
});

module.exports = router;
