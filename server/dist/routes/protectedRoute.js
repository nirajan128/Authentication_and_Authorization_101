"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); //user is authenticated, move to next middleware
    }
    res.redirect("http://localhost:5000/auth/google"); //redirect to google signin page if not authenticated
}
//uses isAuthenticated middleware, once the user is authenticated only then
// ned middleware is executed where the data will be shown
router.get("/dashboard", isAuthenticated, (req, res) => {
    if (req.user) {
        const user = req.user; //Denotin express.User as the USer interface thats defined in passport config
        res.send(`welcome to your dashboard ${user.email}`);
    }
});
exports.default = router;
