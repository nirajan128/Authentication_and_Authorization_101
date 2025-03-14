import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./Components/Pages/HomePage";
import Register from "./Components/Pages/Register";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Protected/Dashboard";

function App() {
  return (
   
      <Router>
         <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;
