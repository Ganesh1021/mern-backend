const express = require("express");
const router = express.Router();
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// GET /api/slots?date=YYYY-MM-DD
// Get all slots for the date, and add if user booked each slot
router.get("/slots", auth, async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    // Find all slots for this date
    let slots = await Slot.find({ date });

    // If no slots found, create default slots
    if (slots.length === 0) {
      const defaultTimes = [
        "06:00 AM - 07:00 AM",
        "07:00 AM - 08:00 AM",
        "05:00 PM - 06:00 PM",
        "06:00 PM - 07:00 PM",
        "07:00 PM - 08:00 PM",
      ];

      const newSlots = defaultTimes.map(time => new Slot({
        time,
        date,
        bookedCount: 0,
        maxBookings: 20,
      }));

      await Slot.insertMany(newSlots);
      slots = await Slot.find({ date });
    }
    console.log("Current user ID:", req.user._id);
    console.log("Query date:", date);
    // Find all bookings for this user on this date
    const userBookings = await Booking.find({
      user: req.user._id,
      date,
    });
    console.log("Slots:", slots);
    console.log("User bookings:", userBookings);
    // Map slots with userHasBooked and standardize output
    const slotsWithBookingInfo = slots.map(slot => {
      const userHasBooked = userBookings.some(
        booking => booking.slot.toString() === slot._id.toString()
      );

      return {
        _id: slot._id,
        time: slot.time,
        bookedCount: slot.bookedCount,
        maxBookings: slot.maxBookings,
        userHasBooked,
      };
    });

    res.json(slotsWithBookingInfo);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/bookings
router.post("/bookings", auth, async (req, res) => {
  try {
    console.log("🔥 NEW BOOKING ROUTE HIT");
    const { slotId, date } = req.body;

    if (!slotId || !date) {
      return res.status(400).json({ message: "Missing slotId or date" });
    }

    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (slot.bookedCount >= slot.maxBookings) {
      return res.status(400).json({ message: "Slot is full" });
    }

    // 🔑 Find user's bookings for this date
    const userBookings = await Booking.find({
      user: req.user._id,
      date,
    });

    // ❌ Max 2 bookings per day
    if (userBookings.length >= 2) {
      return res
        .status(400)
        .json({ message: "You can book only 2 slots per day" });
    }

    // ❌ Same slot twice
    const alreadyBooked = userBookings.some(
      (b) => b.slot.toString() === slotId
    );

    if (alreadyBooked) {
      return res
        .status(400)
        .json({ message: "You already booked this slot" });
    }

    // ✅ CREATE BOOKING (ONLY ONCE)
    await Booking.create({
      user: req.user._id,
      slot: slot._id,
      date,
    });

    // ✅ Update slot count
    slot.bookedCount += 1;
    await slot.save();

    res.json({ success: true, message: "Slot booked successfully" });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// DELETE /api/bookings
// Cancel a booking by slotId and date
router.delete("/bookings", auth, async (req, res) => {
  try {
    console.log("delete");
    
    const { slotId, date } = req.body;
    if (!slotId || !date)
      return res.status(400).json({ message: "Missing slotId or date" });

    // Find booking
    const booking = await Booking.findOne({
      user: req.user._id,
      slot: slotId,
      date,
    });
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    // Remove booking
    await booking.deleteOne();

    // Decrement slot booked count
    const slot = await Slot.findById(slotId);
    if (slot) {
      slot.bookedCount = Math.max(slot.bookedCount - 1, 0);
      await slot.save();
    }

    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/slot-users", auth, async (req, res) => {
  const { slotId, date } = req.query;

  if (!slotId || !date) {
    return res.status(400).json({ message: "Missing slotId or date" });
  }

  try {
    const bookings = await Booking.find({ slot: slotId, date }).populate("user", "name email");
    const users = bookings.map(booking => booking.user);
    res.json(users);
  } catch (err) {
    console.error("Error fetching slot users:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;


















