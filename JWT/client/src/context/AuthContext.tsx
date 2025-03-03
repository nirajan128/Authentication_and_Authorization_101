/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, ReactNode } from "react";

// 1. Define the shape of the authentication context interface
interface AuthContextType {
  user: any; // Stores user details (can be replaced with a specific user type)
  token: string | null; // Stores authentication token
  login: (token: string, user: any) => void; // Function to update authentication state
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

  // Retrieve user from local storage or set null if not available
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem("user") || "null"));

  // Function to handle user login and update authentication state
  const login = (newToken: string, newUser: any) => {
    setToken(newToken); // Set the authentication token state
    setUser(newUser); // Set the user state

    // Store token and user data in local storage for persistence
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    // Provide authentication state and login function to all children components
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
