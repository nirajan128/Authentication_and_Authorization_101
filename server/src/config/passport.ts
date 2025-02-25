import passport, { Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import db from "./db";
import { Query } from "pg";

dotenv.config();

//Interface for the user object
interface User {
    id: number,
    google_id: string,
    firstName: string;
    lastName:string;
    email: string;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL:process.env.GOOGLE_CALLBACK_URL
},async (accessToken:string, refreshToken:string, profile:Profile, done) =>{
     try {
        //get the user details from google profile
        const userEmail = profile.emails?.[0].value;
        const fullName = profile.displayName.split("");
        const firstName = fullName[0];
        const lastName = fullName.slice(1).join(" ") || ""; //handle the case with no lastName

        //check if user exists in database
        const result = await db.query("SELECT * FROM usermone WHERE email = $1", [userEmail]);

        let user: User; //type is user interface

        //If the user exists, set the user to the first index of result
        if(result.rows.length > 0){
            user = result.rows[0];
        }else{ //ELse store new user in the database
            const newUser = await db.query("INSERT INTO usermone (google_id,firstName,lastName,email) VALUES ($1,$2,$3,$4) RETURNING *", 
                [profile.id.toString(), firstName,lastName,userEmail]
            )

            user = newUser.rows[0];
        }
        return done(null, user);  //finally return the user data
     } catch (error) {
        console.log(error);
        return(error);
     }
} ))