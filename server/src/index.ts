import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db";

dotenv.config();
const app = express();
const PORT = 5000;

//Use cors let the frontend URL access of the backend
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  
  app.use(express.json());

  app.get("/", (req,res)=>{
    res.json("Helloo")
  })


  // Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });