import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // ✅ Validation functions
  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 3)
      return "Name must be at least 3 characters long";
    if (!/^[A-Za-z ]+$/.test(value))
      return "Name can contain only letters and spaces";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? "" : "Enter a valid email address";
  };

  const validatePassword = (value) => {
    if (!value.trim()) return "Password is required";
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongRegex.test(value))
      return "Must include upper, lower, number, and special char";
    return "";
  };

  // ✅ Handle typing and live validation
  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "name"
          ? validateName(value)
          : field === "email"
          ? validateEmail(value)
          : validatePassword(value),
    }));
  };

  // ✅ Enable button only when all fields are valid
  useEffect(() => {
    const noErrors =
      !errors.name && !errors.email && !errors.password &&
      name && email && password;
    setIsFormValid(noErrors);
  }, [errors, name, email, password]);

  // ✅ Submit
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Signup failed. Try again.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>
        <h3 className="text-center text-success mb-4 fw-bold">
          🏋️‍♀️ Create Your Canara Gym Account
        </h3>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : name ? "is-valid" : ""}`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : email ? "is-valid" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
              placeholder="Min 6 characters (Strong)"
              value={password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold mt-2"
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            className="text-primary text-decoration-none"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
