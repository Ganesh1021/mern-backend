import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>Canara Gym</h3>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#222",
    color: "white",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { margin: 0 },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
  },
  logoutBtn: {
    marginLeft: "15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    padding: "5px 10px",
  },
};

export default Navbar;



// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../utils/AuthContext";

// function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/">🏋️ Gymify</Link>
//       <div>
//         {!user ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
