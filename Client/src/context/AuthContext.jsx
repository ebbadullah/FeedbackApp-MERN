import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log(
        "AuthContext - Checking token:",
        token ? "Token exists" : "No token"
      );
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token) => {
    console.log(
      "AuthContext - Login called with token:",
      token ? "Token provided" : "No token"
    );
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log("AuthContext - Logout called");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    console.log("AuthContext - State updated:", { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
