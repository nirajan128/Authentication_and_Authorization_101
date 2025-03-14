import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../shared/Spinner";
import { useNavigate } from "react-router-dom";
import ErrorAlertStatus from "../shared/ErrorAlert";
import InputLabel from "../shared/InputLabel";

export default function Login() {
  const API_BASE_URL = "http://localhost:5000"; // Your Express backend URL
  const navigate = useNavigate();
  const { token, login } = useAuth();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  /* Sets the state on Input value */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /* Login functionality */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset error state

    const { email, password } = inputValue;

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const tokenResponse = response.data;

      // Login method from AuthContext, stores token & redirects
      login(tokenResponse);
    } catch (error) {
      console.log(error);
      setErrorMessage("Error while logging in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Google Login Redirect */
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`; // Redirect to backend
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-body shadow p-4 w-100 mt-5" style={{ maxWidth: "400px" }}>
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

          {/* Submit Button */}
          <button className="btn btn-primary bgAccent text-dark mt-3" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {errorMessage && <ErrorAlertStatus message={errorMessage} state="alert-danger" />}

          <p className="mt-5 mb-3 text-body-secondary text-center">©2025</p>
        </form>

        {/* Google Login Button */}
        <div className="mt-3 text-center">
          <button className="btn btn-outline-primary w-100" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
