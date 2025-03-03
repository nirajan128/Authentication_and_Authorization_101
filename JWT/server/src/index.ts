import express from 'express';
import userRoute from './routes/userRoute';
import protectedRoute from "./routes/protectedRoute";

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res) =>{
    res.json("JWT")
})

app.use("/user", userRoute);
app.use("/protected", protectedRoute);

 // Start server
 app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });