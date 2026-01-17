// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Slot({ slot, date }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleBooking = async () => {
//     if (!token) {
//       alert("Please login or signup first!");
//       return navigate("/signup");
//     }

//     try {
//       // Send booking request with slotId and date
//       const res = await axios.post(
//         "http://localhost:5000/api/bookings/book",
//         { slotId: slot._id, date },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.data.success) {
//         alert("✅ Booking successful!");
//         navigate("/confirmation", {
//           state: { slotTime: slot.time, date },
//         });
//       } else {
//         alert(res.data.message || "Slot full or booking failed.");
//       }
//     } catch (err) {
//       console.error("Booking error:", err);
//       alert("Server error. Please try again.");
//     }
//   };

//   return (
//     <div style={styles.card}>
//       <h3>{slot.time}</h3>
//       <p>
//         Remaining:{" "}
//         <b style={{ color: slot.remainingSeats > 0 ? "green" : "red" }}>
//           {slot.remainingSeats}
//         </b>{" "}
//         / 20
//       </p>
//       <button
//         style={{
//           ...styles.button,
//           backgroundColor: slot.remainingSeats > 0 ? "#0d6efd" : "gray",
//           cursor: slot.remainingSeats > 0 ? "pointer" : "not-allowed",
//         }}
//         onClick={handleBooking}
//         disabled={slot.remainingSeats <= 0}
//       >
//         {slot.remainingSeats > 0 ? "Book Now" : "Slot Full"}
//       </button>
//     </div>
//   );
// }

// const styles = {
//   card: {
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     padding: "20px",
//     width: "250px",
//     textAlign: "center",
//     backgroundColor: "white",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   button: {
//     marginTop: "10px",
//     padding: "10px 15px",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "16px",
//   },
// };

// export default Slot;


import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Slot({ slot, date, userHasBooked }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleBooking = async () => {
    if (!token) {
      alert("Please login or signup first!");
      return navigate("/signup");
    }

    // Prevent booking if user has already booked a slot for this day
    if (userHasBooked) {
      alert("⚠️ You have already booked a slot for this day.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings/book",
        { slotId: slot._id, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("✅ Booking successful!");
        navigate("/confirmation", {
          state: { slotTime: slot.time, date },
        });
      } else {
        alert(res.data.message || "Slot full or booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div style={styles.card}>
      <h3>{slot.time}</h3>
      <p>
        Remaining:{" "}
        <b style={{ color: slot.remainingSeats > 0 ? "green" : "red" }}>
          {slot.remainingSeats}
        </b>{" "}
        / 20
      </p>
      <button
        style={{
          ...styles.button,
          backgroundColor:
            slot.remainingSeats > 0 && !userHasBooked ? "#0d6efd" : "gray",
          cursor:
            slot.remainingSeats > 0 && !userHasBooked ? "pointer" : "not-allowed",
        }}
        onClick={handleBooking}
        disabled={slot.remainingSeats <= 0 || userHasBooked}
      >
        {slot.remainingSeats <= 0
          ? "Slot Full"
          : userHasBooked
          ? "Already Booked"
          : "Book Now"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Slot;
