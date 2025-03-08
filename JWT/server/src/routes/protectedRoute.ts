import { Router, Request, Response, NextFunction } from "express";
import db from "../config/db";
import jwtAuthenticator from "../middleware/jwtAuthenticator";

const route = Router();

//Uses jwtAuthenticator middleware, when user post a login request a jwtToken is generated which is tored in local session
// after logged in the user makes a get request /dashboard which uses the middleware to check the token stored in localstorage aginst the JWT secret
// if it passes, the route moves on to next middleware which displays the validUserData
route.get("/dashboard", jwtAuthenticator, (req:Request, res:Response, next:NextFunction) => {
    const validUser = (req as any).user;
    console.log(validUser);
     res.json(validUser);
})

export default route;