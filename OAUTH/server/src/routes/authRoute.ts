import { profile } from "console";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate('google', {
    scope:['profile', 'email']
}))


router.get("/google/callback", passport.authenticate('google', {
    failureRedirect: "http://localhost:5000/auth/faliure",
    successRedirect: 'http://localhost:5173/dashboard'
}))

router.get("/faliure", (req,res) =>{
    res.send('Failed to authenticate.');
})
export default router;