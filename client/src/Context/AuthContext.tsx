import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchDashboard } from "../Utilities/Api";

// Define the structure of a User object to ensure type safety
interface User {
  id: number;
  google_id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Define the authentication context structure
interface AuthContextType {
  user: User | null; // The current logged-in user or null if not logged in
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update user state
  isLoading: boolean; // Flag to indicate if the initial user fetch is in progress
}

// Create the authentication context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

// Create the AuthProvider component to manage and provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to store authenticated user
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Fetch user data when the component mounts
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchDashboard(); // Fetch user data from the backend
        setUser(userData); // Update user state
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle error (e.g., set user to null, show error message)
      } finally {
        setIsLoading(false); // Set loading to false regardless of outcome
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication data
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
