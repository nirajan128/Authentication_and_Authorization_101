"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/google", passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get("/google/callback", passport_1.default.authenticate('google', {
    failureRedirect: "http://localhost:5000/auth/faliure",
    successRedirect: 'http://localhost:5000/protected/dashboard'
}));
router.get("/faliure", (req, res) => {
    res.send('Failed to authenticate.');
});
exports.default = router;
