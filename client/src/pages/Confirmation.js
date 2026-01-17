import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get slot details from navigation state
  const { slotTime, date } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎉 Booking Confirmed!</h2>

        {slotTime && (
          <>
            <p style={styles.text}>You have successfully booked your slot:</p>
            <h3 style={styles.slotTime}>{slotTime}</h3>
            {date && <p style={styles.text}>📅 Date: {date}</p>}
          </>
        )}

        {!slotTime && (
          <p style={styles.error}>No booking data found. Please go back.</p>
        )}

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    color: "#198754",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "10px",
  },
  slotTime: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#0d6efd",
    marginBottom: "15px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Confirmation;
