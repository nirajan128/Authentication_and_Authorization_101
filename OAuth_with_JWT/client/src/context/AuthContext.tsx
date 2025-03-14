/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 1. Define the shape of the authentication context interface
interface AuthContextType {
  token: string | null; // Stores authentication token
  login: (token: string) => void; // Function to update authentication state
  logout: () => void; 
}

// 2. Create a context for authentication with an undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw an error if useAuth is used outside of an AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context; // Return the authentication context value
};

// 4. Authentication provider component to wrap the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Retrieve token from local storage or set null if not available
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const navigate = useNavigate(); // Navigation hook

  // Function to handle user login and update authentication state
  const login = (newToken: string) => {
    setToken(newToken); // Set the authentication token state

    // Store token and user data in local storage for persistence
    localStorage.setItem("token", newToken);

    navigate("/dashboard"); // Redirect to dashboard after login
  };

  const logout = () => {
    setToken(null); // Clear token state
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

    // Extract token from URL query params on first load
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const googleToken = urlParams.get("token");

      //hecks for token in the url, if there is a url calls the login method and passes the token
      if (googleToken) {
        login(googleToken);
        window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
      }
    }, []);

  return (
    // Provide authentication state and login function to all children components
    <AuthContext.Provider value={{token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


