import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

//Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());


app.get("/",(req,res) =>{
    res.json("HEllo");
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));