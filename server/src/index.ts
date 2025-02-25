import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session"
import "./config/passport"; //import the possport configuration to initialized it in the app

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
  
  //Middleware for the app to use JSON
  app.use(express.json());

  //Middleware for setting session
  app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
  }))

  //Middleware for app to use passpprt
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/", (req,res)=>{
    res.json("Helloo")
  })


  // Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });