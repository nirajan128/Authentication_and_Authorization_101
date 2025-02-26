import React, { JSX, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Component/Homepage";
/* import ProtectedRoute from "./protectedRoute"; */
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import Dashboard from "./Component/protected/dashboard";

/* 
* This component ensures that only authenticated users can access protected routes.
 * It checks the user state from the AuthContext and determines whether to allow 
 * access to the requested page or redirect to the homepage.
 *  */
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  // If user is still loading, show nothing or a loading spinner
  if (user === null) {
    return <div>Loading...</div>; // Placeholder, can replace with a better UI
  }

  return user ? children : <Navigate to="/" />;
};


const App:React.FC =() =>{
   return (
     <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route 
              path="/dashboard" 
              element={
                /* Uses protected route to display Dashboard page */
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
        </Routes>
      </Router>
      </AuthProvider>
   )
}

export default App;