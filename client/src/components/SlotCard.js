// import React from "react";
// import "./SlotCard.css"; // ✅ add this

// function SlotCard({ slot, onBook }) {
//   return (
//     <div className={`slot-card ${slot.bookedCount >= 20 ? "full" : ""}`}>
//       <div className="slot-time">{slot.time}</div>
//       <div className="slot-info">
//         <p>{slot.bookedCount}/20 booked</p>
//       </div>
//       <button
//         className="slot-button"
//         disabled={slot.bookedCount >= 20}
//         onClick={onBook}
//       >
//         {slot.bookedCount >= 20 ? "Full" : "Book Slot"}
//       </button>
//     </div>
//   );
// }

// export default SlotCard;


// import React from "react";
// import "./SlotCard.css";

// function SlotCard({ slot, onBook }) {
//   return (
//     <div
//       className={`card shadow-sm text-center p-3 ${
//         slot.bookedCount >= 20 ? "border-danger" : "border-success"
//       }`}
//       style={{ width: "18rem", borderRadius: "15px" }}
//     >
//       <div className="card-body">
//         <h5 className="card-title fw-bold">{slot.time}</h5>
//         <p className="card-text">{slot.bookedCount}/20 booked</p>
//         <button
//           className={`btn ${
//             slot.bookedCount >= 20 ? "btn-secondary" : "btn-primary"
//           }`}
//           onClick={onBook}
//           disabled={slot.bookedCount >= 20}
//         >
//           {slot.bookedCount >= 20 ? "Full" : "Book Slot"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SlotCard;


import React from "react";
import "./SlotCard.css";

function SlotCard({ slot, onBook, userHasBooked }) {
  // Determine if button should be disabled
  const isDisabled = slot.bookedCount >= 20 || userHasBooked;

  return (
    <div
      className={`card shadow-sm text-center p-3 ${
        slot.bookedCount >= 20 ? "border-danger" : "border-success"
      }`}
      style={{ width: "18rem", borderRadius: "15px" }}
    >
      <div className="card-body">
        <h5 className="card-title fw-bold">{slot.time}</h5>
        <p className="card-text">
          {slot.bookedCount}/20 booked
        </p>
        <button
          className={`btn ${
            isDisabled ? "btn-secondary" : "btn-primary"
          }`}
          onClick={onBook}
          disabled={isDisabled}
        >
          {slot.bookedCount >= 20
            ? "Full"
            : userHasBooked
            ? "Already Booked"
            : "Book Slot"}
        </button>
      </div>
    </div>
  );
}

export default SlotCard;
