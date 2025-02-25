import { NextFunction, Router, Request, Response } from "express";
const router = Router();
import {User } from "../config/passport";

//Middleware to check if the user is authenticated
function isAuthenticated(req:Request,res:Response,next: NextFunction){
    if(req.isAuthenticated()){
        return next(); //user is authenticated, move to next middleware
    }
    res.redirect("http://localhost:5000/auth/google"); //redirect to google signin page if not authenticated
}

//uses isAuthenticated middleware, once the user is authenticated only then
// ned middleware is executed where the data will be shown
router.get("/dashboard", isAuthenticated, (req:Request,res: Response) =>{
    if(req.user){
        const user = req.user as User; //Denotin express.User as the USer interface thats defined in passport config
        res.send(`welcome to your dashboard ${user.email}`)
    }
})


export default router;