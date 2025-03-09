import express from "express";
import cors from "cors";
import userRoute from "./route/userRoute";

const app = express();
const PORT = 5000;

//Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/user", userRoute)

app.get("/",(req,res) =>{
    res.json("HEllo");
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));