import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import userRoute from "./route/userRoute";
import passport from "passport";
import session from "express-session"
import "./config/passport";
import protectedRoute from "./route/protectedRoute"

dotenv.config()
const app = express();
const PORT = 5000;

//Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

//initialize passport and session
// Express session middleware
app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Initialize Passport.js middleware
  app.use(passport.initialize());
  app.use(passport.session());

app.use("/auth", userRoute);
app.use("/valid", protectedRoute);

app.get("/",(req,res) =>{
    res.json("HEllo");
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

