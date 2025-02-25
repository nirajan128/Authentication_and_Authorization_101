import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Component/Homepage";

const App:React.FC =() =>{
   return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}/>
        </Routes>
      </Router>
    </div>
   )
}

export default App;