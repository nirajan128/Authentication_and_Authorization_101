import express from 'express';
import userRoute from './routes/userRoute';
import protectedRoute from "./routes/protectedRoute";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res) =>{
    res.json("JWT")
})

//Use cors let the frontend URL access of the backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/user", userRoute);
app.use("/protected", protectedRoute);

 // Start server
 app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });