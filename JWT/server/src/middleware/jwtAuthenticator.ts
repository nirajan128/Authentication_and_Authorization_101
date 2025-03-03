import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* The inface inherits express Request mean we can use it as a express Request */
 interface AuthRequest extends Request {
    user?: string
 }

 /* Whenever a client makes a request for protectedRoute,a JWT token is sent as a part of header if user is successfully logged in
 This Authenticator uses that token and verify it against the secret if thoes match the middleware moves on to the next function  */
 const jwtAuthenticator =  (req: AuthRequest, res:Response, next:NextFunction) => {

    // 1. splits the Authorization header sent from the client side and gets the token value
    const authHeader = req.header("Authorization")?.split(" ")[1];

    if (!authHeader ) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    try{
      // 2. verify the token sent from the client side
      const decoded = jwt.verify(authHeader, process.env.JWT_SECRET as string) as {id: string};

       // 3️. Attach user ID to the request
      req.user = decoded.id;

      //4. continue to next middleware
      next();

    }catch(error){
       return res.status(401).json({message: "Invalid token"})
    }
 }

 export default jwtAuthenticator;