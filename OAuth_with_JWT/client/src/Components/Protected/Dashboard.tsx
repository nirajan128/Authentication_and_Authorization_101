import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

interface UserData{
    id: number;
    google_id: string;
    firstname: string;
    lastname: string;
    email: string;
}

export default function Dashboard(){

    //1. Setup resquired states and value
    const API_BASE_URL = "http://localhost:5000"; // Your Express backend URL
    const {token, logout} = useAuth();
    const [user, setUser] = useState<UserData | null>(null);

    //2. use useEffect to render data according to token and navigate to login page
    useEffect(() => {
      if (!token) {
        logout();
        return;
      }
  
      if (!user) { //3. Fetch user only if not already set
        const fetchUser = async () => {
          try {
            const response = await axios.get<UserData>(`${API_BASE_URL}/valid/dashboard`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
          } catch (error) {
            console.error("Auth problem:", error);
            logout();
          }
        };
  
        fetchUser();
      }
    }, [token, logout, user]);

    return(
    <div className="container">
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.firstname} {user.lastname}!</h2>
          <p>Email: {user.email}</p>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
        {/* Logout Button */}
        <button onClick={logout} className="btn btn-danger mt-3">Logout</button>
    </div>
    )

}