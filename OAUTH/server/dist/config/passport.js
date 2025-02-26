"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //get the user details from google profile
        const userEmail = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        const fullName = profile.displayName.split("");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ") || ""; //handle the case with no lastName
        //check if user exists in database
        const result = yield db_1.default.query("SELECT * FROM usermone WHERE email = $1", [userEmail]);
        let user; // Define a user variable with the User interface type
        //If the user exists, set the user to the first index of result
        if (result.rows.length > 0) {
            user = result.rows[0];
        }
        else { //ELse store new user in the database
            const newUser = yield db_1.default.query("INSERT INTO usermone (google_id,firstname,lastname,email) VALUES ($1,$2,$3,$4) RETURNING *", [profile.id.toString(), firstName, lastName, userEmail]);
            user = newUser.rows[0]; // Assign the newly created user
        }
        return done(null, user); // Pass the user object to the next middleware
    }
    catch (error) {
        console.log(error);
        return (error);
    }
})));
// Serialize user: Stores only the user ID in the session for efficiency
// This helps keep the session data lightweight instead of storing the whole user object
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user: Retrieves the full user data from the database using the stored ID
// This happens on every request after authentication to keep user data fresh and secure
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * FROM usermone WHERE id = $1", [id]);
        const user = result.rows[0];
        if (user) {
            done(null, user); // Pass the full user object
        }
        else {
            done(new Error("User not found"), null);
        }
    }
    catch (err) {
        done(err, null);
    }
}));
