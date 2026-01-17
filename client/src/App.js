// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/NavBar";
// import Login from "./pages/Login";
// import Signup from "./pages/SignUp.js";
// import Dashboard from "./pages/Dashboard";
// import Confirmation from "./pages/Confirmation";
// import PrivateRoute from "./utils/PrivateRoute";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         {/* Default page is Dashboard */}
//         <Route path="/" element={<Dashboard />} />
//     <Route path="/dashboard" element={<Dashboard />} />
//         {/* Auth routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//          <Route path="/confirmation" element={<Confirmation />} />

//         {/* Protected route for confirmation */}
//         <Route
//           path="/confirmation"
//           element={
//             <PrivateRoute>
//               <Confirmation />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Confirmation from "./pages/Confirmation";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <PrivateRoute>
              <Confirmation />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
