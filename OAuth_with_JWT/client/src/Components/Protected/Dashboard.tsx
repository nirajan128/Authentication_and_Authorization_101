import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const {token} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);

    //2. use useEffect to render data according to token and navigate to login page
    useEffect(()=>{ 
        if(!token){
            navigate("/login");
            return;
        }

        //3. create a get rest to protected dashboard rote and set the header with the given token value
        const fetchUser = async()=>{
           try {
              const response = await axios.get<UserData>(`${API_BASE_URL}/valid/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              console.log(token)
              setUser(response.data);
           } catch (error) {
            console.log(error);
            alert("Auth problem")
            navigate("/login")
           }
        }

        fetchUser();

    },[token,navigate])

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
    </div>
    )

}