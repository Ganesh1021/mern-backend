// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../utils/AuthContext";
// import "./Home.css";

// function Home() {
//   const { user, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ When the page loads, check if a user is already logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser && !user) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, [user, setUser]);

//   // ✅ Navigate based on login state
//   const handleBookSlot = () => {
//     if (user) {
//       navigate("/dashboard"); // Already logged in → Go to Dashboard
//     } else {
//       navigate("/login"); // Not logged in → Go to Login page
//     }
//   };

//   return (
//     <div className="home-container">
//       <header className="hero">
//         <h1>Welcome to Canara College Gym</h1>
//         <p>Book your preferred gym slot easily and stay fit!</p>
//         <button className="btn-primary" onClick={handleBookSlot}>
//           Book a Slot
//         </button>
//       </header>

//       <section className="info">
//         <h2>Why Gymify?</h2>
//         <p>Our platform helps students manage gym timings effectively.</p>
//         <img
//           src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
//           alt="Gym"
//           className="hero-img"
//         />
//       </section>
//     </div>
//   );
// }

// export default Home;



import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Navigate based on login state
  const handleBookSlot = () => {
    if (user) {
      navigate("/dashboard"); // Already logged in → Go to Dashboard
    } else {
      navigate("/login"); // Not logged in → Go to Login page
    }
  };

  return (
    <div className="home-container">
      <header className="hero">
        <h1>Welcome to Canara College Gym</h1>
        <p>Book your preferred gym slot easily and stay fit!</p>
        <button className="btn-primary" onClick={handleBookSlot}>
          Book a Slot
        </button>
      </header>

      <section className="info">
        <h2>Why Gymify?</h2>
        <p>Our platform helps students manage gym timings effectively.</p>
        <img
          src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
          alt="Gym"
          className="hero-img"
        />
      </section>
    </div>
  );
}

export default Home;
