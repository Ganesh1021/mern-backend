import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ On app load, check localStorage for token and user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // safe parse
        setUser({ ...parsedUser, token });
      } catch (err) {
        console.error("Error parsing stored user:", err);
        setUser({ token });
      }
    } else if (token) {
      setUser({ token });
    }
  }, []);

  // ✅ Save user info and token on login
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    setUser({ ...userData, token });
  };

  // ✅ Clear all on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
