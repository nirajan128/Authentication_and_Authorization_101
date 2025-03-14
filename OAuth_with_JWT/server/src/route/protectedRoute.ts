import { Router, Request, Response, NextFunction } from "express";
import db from "../config/db";
import jwtAuthenticator from "../middleware/jwtAuthenticator";
import { isAuthenticated } from "../middleware/googleAuth";

const route = Router();

//[Uses jwtAuthenticator middleware], when user post a login request a jwtToken is generated which is tored in local session
// after logged in the user makes a get request /dashboard which uses the middleware to check the token stored in localstorage aginst the JWT secret
// if it passes, the route moves on to next middleware which displays the validUserData

//Also uses [isAuthenticated middleware] of express for googleOAuth
route.get("/dashboard", jwtAuthenticator,isAuthenticated, (req:Request, res:Response, next:NextFunction) => {
    const validUser = (req as any).user;
    /* console.log(validUser); */
     res.json(validUser);
})

export default route;