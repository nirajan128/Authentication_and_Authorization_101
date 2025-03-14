import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

/* Generate a json Webtoken */
const generateToken = (id:string) =>{
    return jwt.sign({id}, process.env.JWT_SECRET as string,{
        expiresIn: "1hr"
    })
}

export default generateToken;