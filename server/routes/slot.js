const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// 📅 Get all slots for a specific date
router.get("/slots", auth, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    let slots = await Slot.find({ date });

    // if slots not created for this date, create default ones
    if (slots.length === 0) {
      const defaultTimes = [
        "06:00 AM - 07:00 AM",
        "07:00 AM - 08:00 AM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
        "07:00 PM - 08:00 PM",
        
      ];

      const newSlots = await Slot.insertMany(
        defaultTimes.map((time) => ({ time, date, bookedCount: 0, maxBookings: 20 }))
      );

      slots = newSlots;
    }

    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🎫 Book a slot
router.post("/bookings", auth, async (req, res) => {
  try {
    const { slotId, date } = req.body;
    if (!slotId || !date) return res.status(400).json({ message: "Missing data" });

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: "Slot not found" });

    // check if slot is full
    if (slot.bookedCount >= slot.maxBookings)
      return res.status(400).json({ message: "Slot full" });

    // Prevent same user from booking the same slot/date again
    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      slotId,
      date
    });
    if (existingBooking)
      return res.status(400).json({ message: "You already booked this slot" });

    // Create new booking
    await Booking.create({ userId: req.user.id, slotId, date });

    // Update slot booked count
    slot.bookedCount += 1;
    await slot.save();

    res.json({ message: "Slot booked successfully", slot });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
