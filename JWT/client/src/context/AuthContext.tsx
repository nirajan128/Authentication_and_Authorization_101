/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, ReactNode } from "react";

// 1. Define the shape of the authentication context interface
interface AuthContextType {
  token: string | null; // Stores authentication token
  login: (token: string) => void; // Function to update authentication state
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

  // Function to handle user login and update authentication state
  const login = (newToken: string) => {
    setToken(newToken); // Set the authentication token state

    // Store token and user data in local storage for persistence
    localStorage.setItem("token", newToken);
  };

  return (
    // Provide authentication state and login function to all children components
    <AuthContext.Provider value={{token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
