import { useState } from "react";
import InputLabel from "../shared/InputLabel";
import Spinner from "../shared/Spinner";
import ErrorAlertStatus from "../shared/ErrorAlert";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Register(){
    const API_BASE_URL = "http://localhost:5000"; // Your Express backend URL
    const navigate = useNavigate();

    //1. States
   const[inputValue, setInputValue] = useState({
    email: "",
    password: "",
    firstName:"",
    lastName:"",
    confirmPassword:""
   });

   const [errorMessage, setErrorMessage] = useState<string | null>();
   const [loading, setLoading] = useState(false);

   //3. Functions
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const{name, value} = e.target;
    setInputValue((prevState)=> ({
        ...prevState,
        [name]: value
    }))
   }


   const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    setLoading(true); //starts loading

    //2. get the input values
    const {email,password,firstName,lastName, confirmPassword} = inputValue;

     //3. Error Handling
     if(inputValue.confirmPassword !== inputValue.password){
        setErrorMessage("Password does not match");
        setLoading(false);
        return;
      }
  
      if (!email || !password || !firstName || !lastName || !confirmPassword) {
        setErrorMessage("All fields are required!");
        setLoading(false); // Stop loading on error
        return;
      }
    
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {email,password,firstName,lastName});
        setErrorMessage(null);
        alert("User successfully registered")
        navigate("/login")
        return response.data;   
      } catch (error) {
        console.error(error);
        setErrorMessage("An error occurred during registration.");
      }finally{
        setLoading(false)
      }

   }

    // Show loading spinner when isLoading is true
  if (loading) {
    return <Spinner />; 
  }


   //2. Components
   return(
    <div className="d-flex bg-dark justify-content-center align-items-center customHeight">
    <div className="bg-light shadow p-4 w-100 mt-5" style={{ maxWidth: "400px" }}>
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="Bootstrap Logo"
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        </div>
        {/*  Input */}
        <InputLabel
          type="text"
          name="firstName"
          value={inputValue.firstName}
          valueChange={handleInputChange}
          label="first name"
        />
        <InputLabel
          type="text"
          name="lastName"
          value={inputValue.lastName}
          valueChange={handleInputChange}
          label="last name"
        />


        {/* Email Input */}
        <InputLabel
          type="email"
          name="email"
          value={inputValue.email}
          valueChange={handleInputChange}
          label="Email Address"
        />

        {/* Password Input */}
        <InputLabel
          type="password"
          name="password"
          value={inputValue.password}
          valueChange={handleInputChange}
          label="Password"
        />

         {/* confirmPassword Input */}
         <InputLabel
          type="password"
          name="confirmPassword"
          value={inputValue.confirmPassword}
          valueChange={handleInputChange}
          label="confirm Password"
        />

        {/* Submit Button */}
        <button className="btn btn-primary bgAccent text-dark mt-3" disabled={loading}>
          {loading ? "Logging in..." : "Register"}
        </button>
        {/* Conditionally render AlertStatus component */}
        {errorMessage && (
          <ErrorAlertStatus message={errorMessage} state="alert-danger" />
        )}

        <p className="mt-5 mb-3 text-body-secondary text-center">© 2017–2024</p>
      </form>
    </div>
  </div>
   )

}