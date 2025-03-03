import express from 'express';
import userRoute from './routes/userRoute';

const app = express();
const PORT = 3000;

app.use(express.json())

app.get("/", (req,res) =>{
    res.json("JWT")
})

app.use("/user", userRoute);

 // Start server
 app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });