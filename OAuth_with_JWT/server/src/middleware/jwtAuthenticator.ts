import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db"; // Import your database connection

dotenv.config();

interface AuthRequest extends Request{
    user?:any
}

const jwtAuthenticator = async (req: AuthRequest, res: Response, next: NextFunction) =>{
    try {
    //1. get the token from header- when user logins via enetering user eamil and password
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }

    const tokenFromHeader = authHeader.split(" ")[1];

    //2. get token from query param - When user logs in using OAuth, the callback redirect url param contains this token
    const tokenFromQuery = req.query.token as string;
 
    //3. Choose either token from header or query
    const token = tokenFromHeader || tokenFromQuery;

    //4. If no token is proveided return error
    if(!token){
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    //5. Verify the token using jwt.verfy which returns a value which can be set to know the user
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string}

    //4. Check if the user exists in db, If the user doesnot exist return an error message
    const authorizedUser = await db.query("SELECT id, firstname, lastname, email FROM usermone WHERE id = $1", [decoded.id]);

    if(authorizedUser.rows.length == 0 ){
        res.status(401).json({ error: 'No user found' });
        return;
    }
    //5. if user exists attach the user to the request
    req.user = authorizedUser.rows[0];

    //6. continue to next middleware
    next();
    } catch (error) {
        console.error("JWT Auth Error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
    
}

export default jwtAuthenticator;