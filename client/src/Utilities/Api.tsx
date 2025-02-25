import axios from "axios";
// Configure Axios to send cookies with requests
axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:5000";

export const loginWithGoogle = () =>{
  window.location.href = `${API_BASE_URL}/auth/google`
}

export const fetchDashboard = async () =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/protected/dashboard`);
    return response.data;
    
  } catch (error) {  
    console.log(error);
    return null;
  }
}