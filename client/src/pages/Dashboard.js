import React, { useEffect, useState } from "react";
import axios from "axios";
import SlotCard from "../components/SlotCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Dashboard() {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);

  // ✅ Helper to get token properly
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  // 📦 Fetch available slots for the selected date
  const fetchSlots = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/slots?date=${date}`,
        { headers: getAuthHeader() }
      );
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Session expired or unauthorized. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Failed to load slots. Please try again later.");
      }
    }
  };

  // 🏋️ Book a slot
  const handleBook = async (slotId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { slotId, date },
        { headers: getAuthHeader() }
      );
      alert("✅ Slot booked successfully!");
      fetchSlots();
    } catch (err) {
      console.error("Error booking slot:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Please log in again to continue.");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Booking failed. Please try again.");
      }
    }
  };

  // 🔁 Fetch slots whenever date changes
  useEffect(() => {
    if (date) fetchSlots();
  }, [date]);

  // 🧭 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      window.location.href = "/login";
    }
  }, []);

  // ✅ Calculate today’s date for min attribute
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const tomorrowStr = tomorrow.toISOString().split("T")[0];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🏋️‍♂️ Book Your Gym Slot
      </h2>

      {/* Date Picker Section */}
      <div className="text-center mb-4">
        <label htmlFor="datePicker" className="form-label fw-semibold">
          Select Date:
        </label>
        <input
          id="datePicker"
          type="date"
          className="form-control w-auto d-inline-block mx-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={tomorrowStr} // ✅ disables past dates
        />
      </div>

      {/* Slots Display Section */}
      {date ? (
        <div className="row">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <div
                key={slot._id}
                className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
              >
                <SlotCard slot={slot} onBook={() => handleBook(slot._id)} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">
              No slots available for this date.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-muted mt-3">
          Please select a date to view available slots.
        </p>
      )}
    </div>
  );
}

export default Dashboard;

