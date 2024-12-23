import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken") // Check if token exists in localStorage
  );
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirect to the dashboard
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
  };

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/login") {
      navigate("/login");
    } else if (isAuthenticated && window.location.pathname === "/login") {
      navigate("/dashboard"); // Redirect to dashboard if already authenticated
    }
  }, [isAuthenticated, navigate]);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
