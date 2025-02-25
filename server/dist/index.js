"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./config/passport"); //import the possport configuration to initialized it in the app
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const protectedRoute_1 = __importDefault(require("./routes/protectedRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 5000;
//Use cors let the frontend URL access of the backend
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
//Middleware for the app to use JSON
app.use(express_1.default.json());
//Middleware for setting session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
//Middleware for app to use passpprt
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", authRoute_1.default); //middleware to use route
app.use("/protected", protectedRoute_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
